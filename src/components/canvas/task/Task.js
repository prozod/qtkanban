import { useState, useEffect } from "react";
import { DueToDate, TaskCard, TaskExtraDetails } from "./Task.styles";
import { DropdownTaskMenu, menuRef } from "./DropdownTaskMenu";
import { useDispatch } from "react-redux";
import { dragDisabled } from "../../../features/draggingSlice";
import { FiMoreVertical } from "react-icons/fi";
import { PriorityTagWrapper } from "./PriorityTag";

export const Task = ({ key, title, priority, boardId, taskId, dueto }) => {
	const dispatch = useDispatch();
	const [showDropdown, setShowDropdown] = useState(false);

	function useOutside(ref) {
		useEffect(() => {
			function handleClickOutside(event) {
				if (ref.current && !ref.current.contains(event.target)) {
					setShowDropdown(false);
					dispatch(dragDisabled(false));
				}
			}

			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [ref]);
	}

	useOutside(menuRef);

	function handleDropdown() {
		setShowDropdown(!showDropdown);
		dispatch(dragDisabled(true));
	}

	return (
		<TaskCard key={key}>
			<div className="task">
				<div className="taskContent">
					<p className="title" onClick={() => dispatch(dragDisabled(false))}>
						{title}
					</p>
					<TaskExtraDetails>
						{priority && <PriorityTagWrapper text={priority} />}
						{dueto && (
							<DueToDate>{dueto.split(" ")[0] + ", " + dueto.slice(3, dueto.length)}</DueToDate>
						)}
					</TaskExtraDetails>
				</div>

				<button aria-label="Task options" className="moreOptions" onClick={handleDropdown}>
					<FiMoreVertical size={19} title="Options" />
				</button>
			</div>
			{showDropdown && (
				<DropdownTaskMenu taskId={taskId} boardId={boardId} setDropdown={setShowDropdown} />
			)}
		</TaskCard>
	);
};
