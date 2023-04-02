<template>
	<DockMenu
		:items="MainMenuItems"
		:on-selected="MenuSelect"
		class="no-drag component__WindowBar-menu"
	></DockMenu>
</template>

<script>
import { DockMenu } from "vue-dock-menu";
import "vue-dock-menu/dist/vue-dock-menu.css";
const remote = require("@electron/remote");

export default {
	data() {
		return {
			MainMenuItems: [
				{
					name: "File",
					menu: [
						{
							name: "Close",
						},
					],
				},
				{
					name: "Help",
					menu: [
						{
							name: "About",
						}
					],
				},
			],
		};
	},

	components: {
		DockMenu,
	},

	props: {},

	methods: {
		MenuSelect(e) {
			switch (e.path) {
				case "file>close":
					remote.getCurrentWindow().close();
					break;
				case "help>about":
					const window = remote.BrowserWindow.getFocusedWindow();
					remote.dialog.showMessageBox(
						window,
						{
							type: "info",
							buttons: ["OK"],
							title: "About",
							message: `Electron Mica Vuetify Window`,
							detail: `Copyright © QuadVector Software 2023`
						}
					);
					break;
			}
		},
	},

	computed: {},
};
</script>

<style scoped>
.component__WindowBar-menu {
	position: relative;
	background: none;
}

.component__WindowBar-menu:deep() ul li {
	background: none;
}

.component__WindowBar-menu:deep() .menu-wrapper {
	border-radius: var(--base-radius);
	box-shadow: rgba(0, 0, 0, 0.1) 1px 5px 15px;
	padding: 5px;
	backdrop-filter: blur(5px);
}

.component__WindowBar-menu:deep() .menu-wrapper li:not(.divider) {
	transition: 0.1s;
	color: var(--v-theme-text);
	border-radius: var(--base-radius);
	text-transform: none;
}

.component__WindowBar-menu:deep() .menu-item {
	cursor: default !important;
}

.v-theme--ThemeDark .component__WindowBar-menu:deep() .menu-wrapper {
	background: rgba(var(--v-theme-window-bar), 0.95) !important;
	border: rgba(255, 255, 255, 0.09) 1px solid;
}

.v-theme--ThemeDark .component__WindowBar-menu:deep() .menu-wrapper li:hover {
	background: rgba(255, 255, 255, 0.05);
}

.v-theme--ThemeDark
	.component__WindowBar-menu:deep()
	.menu-bar-item-container:focus-visible {
	outline-color: rgba(255, 255, 255, 0) !important;
}

.v-theme--ThemeDark
	.component__WindowBar-menu:deep()
	.menu-bar-item-container.active {
	background: rgba(255, 255, 255, 0.08) !important;
}

.v-theme--ThemeDark
	.component__WindowBar-menu:deep()
	.menu-bar-item-container.active:active {
	background: rgba(255, 255, 255, 0.05) !important;
}

.v-theme--ThemeLight .component__WindowBar-menu:deep() .menu-wrapper {
	background: rgba(var(--v-theme-window-bar), 1) !important;
	border: rgba(0, 0, 0, 0.05) 1px solid;
}

.v-theme--ThemeLight .component__WindowBar-menu:deep() .menu-wrapper li:hover {
	background: rgba(0, 0, 0, 0.05);
}

.component__WindowBar-menu:deep() .menu-bar-item-container {
	border-radius: var(--base-radius);
	border: 0px;
	transition: 0.1s;
	outline: transparent 2px solid !important;
	cursor: default !important;
}

.v-theme--ThemeLight
	.component__WindowBar-menu:deep()
	.menu-bar-item-container:focus-visible {
	outline-color: rgba(255, 255, 255, 0.1) !important;
}

.v-theme--ThemeLight
	.component__WindowBar-menu:deep()
	.menu-bar-item-container.active {
	background: rgba(0, 0, 0, 0.06) !important;
}

.v-theme--ThemeLight
	.component__WindowBar-menu:deep()
	.menu-bar-item-container.active:active {
	background: rgba(0, 0, 0, 0.03) !important;
}

.component__WindowBar-menu:deep() .name-container {
	color: var(--v-theme-text) !important;
}

.component__WindowBar-menu:deep() .divider {
	pointer-events: none;
}
</style>
