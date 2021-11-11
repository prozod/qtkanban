import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		value: {
			id: "",
			email: "",
			username: "",
			photo_url: "",
			isLogged: false,
		},
		tasks: [],
		boards: [],
	},
	reducers: {
		loginStatus: (state, action) => {
			state.value = action.payload;
		},
		updateTasks: (state, action) => {
			state.tasks = action.payload;
		},
		updateBoards: (state, action) => {
			state.boards = action.payload;
		},
	},
});

export const { loginStatus, updateTasks, updateBoards } = userSlice.actions;
export default userSlice.reducer;
