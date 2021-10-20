import React from "react";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Canvas from "../components/canvas/Canvas";
import { useHistory, withRouter } from "react-router";

function Dashboard({ isLogged, action }) {
	let history = useHistory();
	if (!isLogged) history.push("/");

	return (
		<>
			<Header />
			<Canvas />
			<Sidebar logout={action} />
		</>
	);
}

export default withRouter(Dashboard);
