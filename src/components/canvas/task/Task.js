import { TaskCard } from "./Task.styles";
import { FiMoreVertical } from "react-icons/fi";
import { useState, useEffect } from "react";
import { DropdownTaskMenu, menuRef } from "../../utilities/DropdownTaskMenu";
import { useDispatch } from "react-redux";
import { dragDisabled } from "../../../features/draggingSlice";

export const Task = ({ key, title, details, boardId }) => {
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
					<p className="title">{title}</p>
					<p className="desc">{details}</p>
				</div>

				<div className="moreOptions" onClick={handleDropdown}>
					<FiMoreVertical size={19} title="Options" />
				</div>
			</div>
			{showDropdown && <DropdownTaskMenu taskId={details} boardId={boardId} />}
		</TaskCard>
	);
};
