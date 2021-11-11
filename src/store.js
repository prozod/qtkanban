import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import disableDrag from "./features/draggingSlice";
import editMenu from "./features/editSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		disableDrag: disableDrag,
		editMenu: editMenu,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;
