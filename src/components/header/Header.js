import React, { useState } from "react";
import { HeaderWrapper, Divider, HeaderNavigation, BoardsNavigation } from "./Header.styles";

import AddNewBoard from "../canvas/board/AddNewBoard";
import AddNewBoardModal from "../canvas/board/AddNewBoardModal";

export default function Header() {
	const [toggleModal, setToggleModal] = useState(false);

	function toggle(e) {
		e.stopPropagation();
		setToggleModal(!toggleModal);
	}

	return (
		<HeaderWrapper>
			<HeaderNavigation>
				<p className="panel">Boards</p>
				<AddNewBoard onClick={toggle} />
			</HeaderNavigation>
			<Divider />
			{toggleModal && <AddNewBoardModal closeModal={toggle} />}
			{/* <AddNewBoardModal /> */}
			{/* <BoardsNavigation>
				<p className="name">
					Project Selenium <RiArrowDownSFill size={20} />
				</p>
			</BoardsNavigation> */}
		</HeaderWrapper>
	);
}
