import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect, useState } from "react";
import Canvas from "./components/canvas/Canvas";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import { db } from "./firebase";
import { collection, getDocs } from "@firebase/firestore";

function App() {
	const [user, setUser] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const data = collection(db, "users");
			const dataSnap = await getDocs(data);

			setUser(dataSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		};
		fetchData();
	}, []);

	return (
		<div className="App">
			<Provider store={store}>
				<Header />
				<Sidebar />
				<Canvas userId={user} />
			</Provider>
		</div>
	);
}

export default App;
