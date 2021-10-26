import { TaskCard } from "./Task.styles";
import { FiMoreVertical } from "react-icons/fi";
import { useState } from "react";
import { Menu } from "../../utilities/DropdownOptions";

export const Task = ({ key, title, details }) => {
	const [showDropdown, setShowDropdown] = useState(false);

	function handleDropdown() {
		setShowDropdown(!showDropdown);
		console.log("menu here");
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
		</TaskCard>
	);
};
