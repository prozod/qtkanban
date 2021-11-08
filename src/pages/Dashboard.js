import React from "react";
import Header from "../components/header/Header";
import Canvas from "../components/canvas/Canvas";
import { withRouter } from "react-router";

function Dashboard() {
	return (
		<>
			<Header />
			<Canvas />
		</>
	);
}

export default withRouter(Dashboard);
