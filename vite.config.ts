import { rmSync } from "fs";
import { defineConfig, Plugin, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import electron from "vite-plugin-electron";
import pkg from "./package.json";

rmSync("dist", { recursive: true, force: true }); // v14.14.0

export default defineConfig({
	plugins: [
		vue(),
		electron({
			main: {
				entry: "electron/index.ts",
				vite: withDebug({
					build: {
						outDir: "dist/electron",
					},
				}),
			},
			renderer: {},
		}),
	],
	resolve: {
	},
	server: {
		host: pkg.env.VITE_DEV_SERVER_HOST,
		port: pkg.env.VITE_DEV_SERVER_PORT,
	},
});

function withDebug(config: UserConfig): UserConfig {
	if (process.env.VSCODE_DEBUG) {
		if (!config.build) config.build = {};
		config.build.sourcemap = true;
		config.plugins = (config.plugins || []).concat({
			name: "electron-vite-debug",
			configResolved(config) {
				const index = config.plugins.findIndex(
					(p) => p.name === "electron-main-watcher"
				);
				(config.plugins as Plugin[]).splice(index, 1);
			},
		});
	}
	return config;
}
