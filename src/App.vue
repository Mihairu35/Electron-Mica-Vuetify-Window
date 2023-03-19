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

export default {
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
