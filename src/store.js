import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./features/boardSlice";

export const store = configureStore({
	reducer: {
		task: taskReducer
	}
});
