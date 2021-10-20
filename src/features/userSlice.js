import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		value: { id: "", email: "", username: "", photo_url: "", isLogged: false },
	},
	reducers: {
		loginStatus: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const { loginStatus } = userSlice.actions;
export default userSlice.reducer;
