import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import disableDrag from "./features/draggingSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		disableDrag: disableDrag,
	},
});

export default store;
