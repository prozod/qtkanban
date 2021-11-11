// styling + icons

import { AiOutlineEdit } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";
import { toast } from "react-toastify";

// states, refs, firebase
import { createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, updateBoardItems } from "../../../firebase";
import { arrayRemove } from "@firebase/firestore";
import { dragDisabled } from "../../../features/draggingSlice";
import { editActive, getId } from "../../../features/editSlice";
import MenuWrapper from "../../dropdown/MenuWrapper";
import MenuItem from "../../dropdown/MenuItem";

export const menuRef = createRef();

export const DropdownTaskMenu = ({ taskId, boardId, setDropdown }) => {
	const dispatch = useDispatch();
	const { id: userId } = useSelector((state) => state?.user.value);
	// style={{ right: "50%", position: "absolute" }}
	return (
		<div ref={menuRef}>
			<MenuWrapper right>
				<MenuItem
					aria-label="Edit task"
					onClick={() => {
						dispatch(dragDisabled(true));
						dispatch(editActive(true));
						dispatch(getId(taskId));
						setDropdown(false);
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
		</div>
	);
};
