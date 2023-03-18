<template>
	<div class="component__WindowBar">
		<v-app-bar class="component__WindowBar__bar" density="compact">
			<template v-slot:prepend>
				<MainMenu />
			</template>

			<v-app-bar-title class="component__WindowBar-title text-center">
				{{ windowTitle }}
			</v-app-bar-title>

			<div class="component__WindowBar__bar-actions">
				<v-btn
					@click="minimizeWindow()"
					class="no-drag component__WindowBar__bar-button"
					icon
				>
					<v-icon>mdi-window-minimize</v-icon>
				</v-btn>

				<v-btn
					@click="maximizeWindow()"
					class="no-drag component__WindowBar__bar-button"
					icon
				>
					<v-icon v-if="IsWindowMaximized">mdi-dock-window</v-icon>
					<v-icon v-if="!IsWindowMaximized"
						>mdi-window-maximize</v-icon
					>
				</v-btn>

				<v-btn
					@click="closeWindow()"
					class="no-drag component__WindowBar__bar-button"
					icon
				>
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</div>
		</v-app-bar>
	</div>
</template>

<script>
import "vue-dock-menu/dist/vue-dock-menu.css";
import Store from "../../store/store";
import MainMenu from "../../components/core/MainMenu.vue";
const remote = require("@electron/remote");

let currentWindow = remote.getCurrentWindow();

currentWindow.on("maximize", function () {
	Store.commit("SetIsWindowMaximized", true);
});

currentWindow.on("unmaximize", function () {
	Store.commit("SetIsWindowMaximized", false);
});

Store.commit("SetIsWindowMaximized", currentWindow.isMaximized());

export default {
	data() {
		return {
			windowTitle: currentWindow.getTitle(),
		};
	},

	components: {
		MainMenu,
	},

	props: {},

	methods: {
		closeWindow() {
			currentWindow.close();
		},

		maximizeWindow() {
			currentWindow.isMaximized()
				? currentWindow.unmaximize()
				: currentWindow.maximize();
		},

		minimizeWindow() {
			currentWindow.minimize();
		},
	},

	computed: {
		IsWindowMaximized() {
			return this.$store.state.IsWindowMaximized;
		},
	},
};
</script>

<style scoped>
.component__WindowBar {
	position: relative;
	height: var(--windowbar-height);
}
.component__WindowBar:deep() {
	position: relative !important;
}

.component__WindowBar:deep() .component__WindowBar__bar {
	-webkit-app-region: drag;
	box-shadow: none !important;
	background: rgb(var(--v-theme-window-bar)) !important;
	overflow: visible;
	height: 10px;
}

.component__WindowBar:deep() .no-drag {
	-webkit-app-region: no-drag;
}

.component__WindowBar__bar:deep() .component__WindowBar__bar-actions {
	display: flex;
	gap: 15px;
	align-items: center;
	justify-content: center;
	margin-right: 15px;
}

.component__WindowBar__bar:deep() .v-field__prepend-inner,
.component__WindowBar__bar:deep() .v-field__append-inner,
.component__WindowBar__bar:deep() .v-field__clearable {
	padding-top: 7px;
}



.component__WindowBar:deep() .v-toolbar {
	height: inherit;
	background: none !important;
}

.component__WindowBar:deep() .v-btn {
	transition: 0.1s;
	cursor: default;
}

.v-theme--ThemeLight .component__WindowBar:deep() .v-btn:hover {
	background: rgba(255, 255, 255, 0.1);
}

.component__WindowBar:deep() .component__WindowBar-title {
	-webkit-user-select: none;
	font-size: 16px;
	margin-left: 10px;
	color: rgb(var(--v-theme-text));
}

.component__WindowBar:deep() .v-icon:before,
.component__WindowBar:deep() [class*="dx-icon-"] {
	color: rgb(var(--v-theme-text));
}

.component__WindowBar:deep() .component__WindowBar__bar-button {
	width: 28px;
	height: 28px;
	font-size: 12px;
}

.v-theme--ThemeDark .component__WindowBar:deep() .v-btn:hover {
	background: rgba(255, 255, 255, 0.1);
}
</style>
