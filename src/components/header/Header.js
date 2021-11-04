import React, { useState } from "react";
import { HeaderWrapper, Divider, HeaderNavigation } from "./Header.styles";

import CreateBoard from "../canvas/board/CreateBoardButton";
import CreateBoardModal from "../canvas/board/CreateBoardModal";

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
				<CreateBoard onClick={toggle} />
			</HeaderNavigation>
			<Divider />
			{toggleModal && <CreateBoardModal closeModal={toggle} />}

			{/* <BoardsNavigation>
				<p className="name">
					Project Selenium <RiArrowDownSFill size={20} />
				</p>
			</BoardsNavigation> */}
		</HeaderWrapper>
	);
}
