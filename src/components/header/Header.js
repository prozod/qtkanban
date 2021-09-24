import React from "react";
import {
	HeaderWrapper,
	Divider,
	HeaderNavigation,
	BoardsNavigation
} from "./Header.styles";
import { RiArrowDownSFill } from "react-icons/ri";

export default function Header() {
	return (
		<HeaderWrapper>
			<HeaderNavigation>
				<p className="panel">Boards</p>
			</HeaderNavigation>
			<Divider />
			<BoardsNavigation>
				<p className="name">
					Project Selenium <RiArrowDownSFill size={20} />
				</p>
			</BoardsNavigation>
		</HeaderWrapper>
	);
}
