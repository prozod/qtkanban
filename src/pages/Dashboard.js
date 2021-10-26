import React from "react";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Canvas from "../components/canvas/Canvas";
import { withRouter } from "react-router";

function Dashboard({ logout }) {
	return (
		<>
			<Header />
			<Canvas />
			<Sidebar logout={logout} />
		</>
	);
}

export default withRouter(Dashboard);
