<template>
	<v-app id="app__container">
		<WindowBar />
		<v-main class="app__content">
			<Main />
		</v-main>
	</v-app>
</template>

<script>
import WindowBar from "./components/core/WindowBar.vue";
import Main from "./components/core/Main.vue";
import { useTheme } from "vuetify";
const remote = require("@electron/remote");

export default {
	setup() {
		//vue theme change
		const theme = useTheme();
		remote.getCurrentWindow().on("focus", function () {
			theme.global.name.value = remote.nativeTheme.shouldUseDarkColors
				? "ThemeDark"
				: "ThemeLight";
		});
	},
	components: {
		WindowBar,
		Main,
	},
	data() {
		return {};
	},
	computed: {},
	methods: {},
};
</script>
