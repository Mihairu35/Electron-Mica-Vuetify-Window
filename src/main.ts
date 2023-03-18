import { createApp } from "vue";
import App from "./App.vue";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@imengyu/vue3-context-menu/lib/vue3-context-menu.css";
import { ContextMenu } from "@imengyu/vue3-context-menu";
import "/src/assets/css/common.css";
import Store from "./store/store";
const remote = require("@electron/remote");
const Color = require("color");
const app = createApp(App);

//dark and light themes defenitions
const ThemeDark: ThemeDefinition = {
	dark: true,
	colors: {
		"background": "#1E1E1E",
		"window-bar": "#323233",
		"surface": "#252526",
		"border": "#414141",
		"text": "#D8D8D8",
		"text-reverse": "#000000",
		"primary": "#1048af",
		"primary-darken-1": "#0e3f9b",
		"secondary": "#3c3b49",
		"secondary-darken-1": "#24242c",
		"error": "#7a2929",
		"info": "#245d8b",
		"success": "#406912",
		"warning": "#ca6d16",
		"window-unfocused": Color(
			"#" + remote.systemPreferences.getAccentColor().substr(0, 6)
		)
			.grayscale()
			.lightness(12.5)
			.hex(),
	},
};

const ThemeLight: ThemeDefinition = {
	dark: false,
	colors: {
		"background": "#ffffff",
		"window-bar": "#ffffff",
		"surface": "#ffffff",
		"border": "#c2c2c2",
		"text": "#000000",
		"text-reverse": "#ffffff",
		"primary": "#1048af",
		"primary-darken-1": "#0e3f9b",
		"secondary": "#3c3b49",
		"secondary-darken-1": "#24242c",
		"error": "#7a2929",
		"info": "#245d8b",
		"success": "#406912",
		"warning": "#ca6d16",
		"window-unfocused": Color(
			"#" + remote.systemPreferences.getAccentColor().substr(0, 6)
		)
			.grayscale()
			.lightness(99)
			.hex(),
	},
};

//vuetify instance
const vuetify = createVuetify({
	components,
	directives,
	theme: {
		defaultTheme: remote.nativeTheme.shouldUseDarkColors
			? "ThemeDark"
			: "ThemeLight",
		themes: {
			ThemeDark,
			ThemeLight,
		},
	},
});

app.use(vuetify).use(Store).use(ContextMenu).mount("#app");
