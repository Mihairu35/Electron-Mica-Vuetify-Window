import { createStore } from "vuex";

const store = createStore({
	mutations: {
		SetIsWindowMaximized(state: Store, value: bool) {
			state.IsWindowMaximized = value;
		},
	},
});

export default store;