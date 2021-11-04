import styled from "styled-components";
import { AiOutlineEdit } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";
import { createRef } from "react";
import { deleteTask, updateBoardItems } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import { arrayRemove } from "@firebase/firestore";
import { dragDisabled } from "../features/draggingSlice";
import { editActive, getId } from "../features/editSlice";
import { toast } from "react-toastify";

const MenuWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 150px;
	height: fit-content;
	background: white;
	position: absolute;
	z-index: 99999999;
	border: 1px solid #e3e4e6;
	border-radius: 10px;
	padding: 1em 0;
	margin: 0;
	right: 0;
	filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.1));
`;

const MenuItem = styled.button`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding: 10px 15px;
	cursor: pointer;
	line-height: 5px;
	background: none;
	border: none;

	p {
		margin: 0;
		font-size: 0.8rem;
		font-weight: 600;
		margin-left: 10px;
	}

	&:hover {
		background: #ededed;
	}
`;

export const menuRef = createRef();

export const DropdownTaskMenu = ({ taskId, boardId }) => {
	const dispatch = useDispatch();
	const { id: userId } = useSelector((state) => state?.user.value);

	return (
		<MenuWrapper ref={menuRef}>
			<MenuItem
				aria-label="Edit task"
				onClick={() => {
					dispatch(dragDisabled(true));
					dispatch(editActive(true));
					dispatch(getId(taskId));

					console.log(`Editing task ${taskId}`);
				}}
			>
				<span>
					<AiOutlineEdit size={19} />
				</span>
				<p>Edit</p>
			</MenuItem>
			<MenuItem
				aria-label="Delete task"
				onClick={() => {
					dispatch(dragDisabled(false));
					updateBoardItems(userId, boardId, {
						items: arrayRemove(taskId),
					});
					deleteTask(userId, taskId);
					toast.success("Issue removed successfully.");
				}}
			>
				<span>
					<IoTrashOutline size={18} />
				</span>
				<p>Delete</p>
			</MenuItem>
		</MenuWrapper>
	);
};
