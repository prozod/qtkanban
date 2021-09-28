import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
	name: "task",
	initialState: {
		isActive: false
	},
	reducers: {
		changeState: (state, action) => {
			state.isActive = !state.isActive;
		},
		addNewTask: (state, action) => {}
	}
});

export const { changeState } = taskSlice.actions;
export default taskSlice.reducer;
