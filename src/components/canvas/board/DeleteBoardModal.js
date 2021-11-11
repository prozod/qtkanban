import { arrayRemove } from "@firebase/firestore";
import React from "react";
import { IoTrashOutline, IoArrowBackCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { deleteBoard, deleteTask, updateBoardItems } from "../../../firebase";
import MenuItem from "../../dropdown/MenuItem";
import MenuWrapper from "../../dropdown/MenuWrapper";
import styled from "styled-components";
import Backdrop from "../../../utilities/Backdrop";

const WarningMessage = styled.div`
	display: flex;
	font-size: 0.75rem;
	padding: 0 15px;

	span {
		font-weight: 600;
	}
`;

export default function DeleteBoardModal({ boardItems, userId, boardId, setDropdown }) {
	return (
		<Backdrop onClick={setDropdown}>
			<MenuWrapper onClick={(e) => e.stopPropagation()}>
				<WarningMessage>
					{boardItems.length > 0 ? (
						<p>
							<span>Attention!</span> <br />
							The board still has {boardItems.length} active
							{boardItems.length > 1 ? "tasks" : "task"}. Removing it will also delete the tasks
							permanently. <br /> Do you wish to continue?
						</p>
					) : (
						<p>You are about to delete a board. Are you sure?</p>
					)}
				</WarningMessage>
				<MenuItem
					onClick={() => {
						if (boardItems.length > 0) {
							boardItems.forEach((taskId) => {
								updateBoardItems(userId, boardId, {
									items: arrayRemove(taskId),
								});
								deleteTask(userId, taskId);
								deleteBoard(userId, boardId);
							});
						} else {
							deleteBoard(userId, boardId);
						}
						toast.success("Board deleted.");
					}}
				>
					<span>
						<IoTrashOutline size={18} />
					</span>
					<p>Delete board</p>
				</MenuItem>
				<MenuItem onClick={setDropdown}>
					<span>
						<IoArrowBackCircleOutline size={18} />
					</span>
					<p>Cancel</p>
				</MenuItem>
			</MenuWrapper>
		</Backdrop>
	);
}
