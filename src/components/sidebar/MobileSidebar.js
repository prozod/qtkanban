import React from "react";
import { Link } from "react-router-dom";
import { NavItem, Wrapper } from "./MobileSidebar.styles";

export default function MobileSidebar({ logout }) {
	return (
		<Wrapper>
			<NavItem>
				<Link to="/account">Account</Link>
			</NavItem>
			<NavItem>
				<Link to="/boards">Boards</Link>
			</NavItem>
			<NavItem>
				<button onClick={logout}>Logout</button>
			</NavItem>
		</Wrapper>
	);
}
