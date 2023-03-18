// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const remote = require("@electron/remote");

function updateTheme() {
	let themeClass = remote.nativeTheme.shouldUseDarkColors
		? "v-theme--ThemeDark"
		: "v-theme--ThemeLight";
	document.body.className = themeClass;
}

remote.getCurrentWindow().on("focus", function () {
	updateTheme();
});

window.addEventListener("DOMContentLoaded", () => {
	updateTheme();
});