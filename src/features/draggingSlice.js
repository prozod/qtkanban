import { createSlice } from "@reduxjs/toolkit";

export const disableDrag = createSlice({
	name: "dragdisable",
	initialState: { isDisabled: false },
	reducers: {
		dragDisabled: (state, action) => {
			state.isDisabled = !state.isDisabled;
		},
	},
});

export const { dragDisabled } = disableDrag.actions;
export default disableDrag.reducer;
