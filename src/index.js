import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

// === PROJECT INFO === //

// client side rendered create react app
// => database and auth provided by Firebase
// => styling done with styled components
// === DEPS === //
//// -> react-beautiful-dnd
//// -> react-toastify
//// -> react-icons
//// -> react-color

// === FOLDER STRUCTURE == //

// src
//// -> components
//// -> pages
//// -> images
//// -> utilities
//// -> constants
//// -> features (RTK)
//// firebase, RTK store
