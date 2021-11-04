import { createSlice } from "@reduxjs/toolkit";

export const editMenu = createSlice({
	name: "edit",
	initialState: { isActive: false, taskId: "" },
	reducers: {
		editActive: (state, action) => {
			state.isActive = !state.isActive;
		},
		getId: (state, action) => {
			state.taskId = action.payload;
		},
	},
});

export const { editActive, getId } = editMenu.actions;
export default editMenu.reducer;
