import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import Canvas from "./components/canvas/Canvas";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Modal from "./components/modal/Modal";

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<Header />
				<Sidebar />
				{/* <Modal /> */}
				<Canvas />
			</Provider>
		</div>
	);
}

export default App;
