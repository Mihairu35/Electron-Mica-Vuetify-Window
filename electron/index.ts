import {
	app,
	BrowserWindow,
	shell,
	ipcMain,
	systemPreferences,
} from "electron";
import { release } from "os";
import { join } from "path";
import { PARAMS, MicaBrowserWindow, IS_WINDOWS_11, WIN10 } from "mica-electron";

let firstFocus = false; //smooth open window and theme change fix

//main window init options
let win: MicaBrowserWindow | BrowserWindow = null;
const initWidth: number = 1100;
const initHeight: number = 700;
const contrastWindowBorder: boolean = false;

export const ROOT_PATH = {
	dist: join(__dirname, "../../dist"),
	public: join(__dirname, "../../public"),
	electron: join(__dirname, "../../electron"),
};

const url: String = `http://${process.env["VITE_DEV_SERVER_HOST"]}:${process.env["VITE_DEV_SERVER_PORT"]}`;
const indexHtml: String = join(ROOT_PATH.dist, "index.html");

if (release().startsWith("6.1")) app.disableHardwareAcceleration();
if (process.platform === "win32") {
	app.setAppUserModelId(app.getName());
	app.commandLine.appendSwitch("enable-transparent-visuals");
}

if (!app.requestSingleInstanceLock()) {
	app.quit();
	process.exit(0);
}

async function createWindow() {
	//apply mica theme for windows
	if (process.platform === "win32") {
		win = new MicaBrowserWindow({
			icon: join(ROOT_PATH.public, "favicon.ico"),
			width: initWidth,
			height: initHeight,
			fullscreenable: false,
			offscreen: true,
			webPreferences: {
				nodeIntegration: true,
				contextIsolation: false,
				devTools: true,
				webSecurity: false,
				preload: join(ROOT_PATH.electron, "preload.ts"),
			},
			autoHideMenuBar: true,
			frame: false,
			show: true,
			//titleBarStyle: "hidden",
			//titleBarOverlay: true,
		});

		if (IS_WINDOWS_11) {
			win.setMicaEffect();
		}

		win.setMicaEffect();
		win.setAutoTheme();

		//windows theme border
		systemPreferences.on("accent-color-changed", function () {
			if (IS_WINDOWS_11) {
				if(contrastWindowBorder) {
					let accentColorHEX =
						"#" + systemPreferences.getAccentColor().substr(0, 6);

					win.setBorderColor(accentColorHEX);
				}

				win.webContents.executeJavaScript(
					`document.querySelector('body').classList.remove('unfocused')`
				);
			}
		});

		win.on("focus", function () {
			if (IS_WINDOWS_11) {
				if(contrastWindowBorder) {
					let accentColorHEX =
						"#" + systemPreferences.getAccentColor().substr(0, 6);

					win.setBorderColor(accentColorHEX);
				}

				win.webContents.executeJavaScript(
					`document.querySelector('body').classList.remove('unfocused')`
				);
			}

			if (!firstFocus) {
				setTimeout(function () {
					win.show();
					firstFocus = true;
				}, 200);
			} else {
				win.show();
			}
		});

		win.on("blur", function () {
			if (IS_WINDOWS_11) {
				if(contrastWindowBorder) {
					let colorHEX = systemPreferences
						.getColor("window-frame")
						.substr(0, 7);
						
					win.setBorderColor(colorHEX);
				}

				win.webContents.executeJavaScript(
					`document.querySelector('body').classList.add('unfocused')`
				);
			}
		});
	} else {
		//apply native window if OS is not Windows
		win = new BrowserWindow({
			icon: join(ROOT_PATH.public, "favicon.ico"),
			width: initWidth,
			height: initHeight,
			webPreferences: {
				nodeIntegration: true,
				contextIsolation: false,
				devTools: true,
				webSecurity: false,
				preload: join(ROOT_PATH.electron, "preload.ts"),
			},
			autoHideMenuBar: true,
			frame: false,
			show: false,
		});
	}

	if (app.isPackaged) {
		win.loadFile(indexHtml);
	} else {
		win.loadURL(url);
	}

	win.webContents.once("dom-ready", () => {
		win.show();
	});

	win.webContents.on("did-finish-load", () => {
		win?.webContents.send(
			"main-process-message",
			new Date().toLocaleString()
		);
	});

	win.webContents.setWindowOpenHandler(({ url }) => {
		if (url.startsWith("https:")) shell.openExternal(url);
		return { action: "deny" };
	});

	const remoteMain = require("@electron/remote/main");
	remoteMain.initialize();
	remoteMain.enable(win.webContents);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
	win = null;
	if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
	if (win) {
		if (win.isMinimized()) win.restore();
		win.focus();
	}
});

app.on("activate", () => {
	const allWindows = BrowserWindow.getAllWindows();
	if (allWindows.length) {
		allWindows[0].focus();
	} else {
		createWindow();
	}
});

ipcMain.handle("open-win", (event, arg) => {
	const childWindow = new BrowserWindow({
		webPreferences: {
			preload: join(ROOT_PATH.electron, "preload.ts"),
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	if (app.isPackaged) {
		childWindow.loadFile(indexHtml, { hash: arg });
	} else {
		childWindow.loadURL(`${url}/#${arg}`);
	}
});
