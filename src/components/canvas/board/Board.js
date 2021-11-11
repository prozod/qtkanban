import { useState, useRef, useEffect } from "react";
import Button from "../../button/Button";
import { Form, Input } from "../../../utilities/Form";
import { IoMdAdd } from "react-icons/io";
import { GoCheck } from "react-icons/go";
import { createNewTask } from "../../../firebase";
import {
	BoardContainer,
	BoardArea,
	CardHeader,
	Cards,
	NewTask,
	Divider,
	CardHeaderContent,
	ActiveTasks,
} from "./Board.styles";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { createTaskVariant } from "../../../utilities/Variants";
import DeleteBoardModal from "./DeleteBoardModal";

export default function Board({ userId, children, boardId, color, title, boardItems }) {
	const [taskName, setTaskName] = useState({ id: 0, value: "" });
	const [isClicked, setIsClicked] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);

	function toggleDropdown(e) {
		e.stopPropagation();
		setShowDropdown(!showDropdown);
	}

	//Form handling for new tasks
	const handleClick = () => {
		setIsClicked(!isClicked);
	};

	const onInputChange = (e) => {
		const { id, value } = e.target;
		setTaskName({ id: id, value: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!taskName.value || taskName.value === "") {
			toast.error("Task name cannot be empty!");
		} else {
			createNewTask(userId, taskName.id, {
				name: taskName.value,
			});
		}

		setTaskName({ id: 0, value: "" });
		setIsClicked(false);
	};

	function useOutside(ref) {
		useEffect(() => {
			function handleClickOutside(event) {
				if (ref.current && !ref.current.contains(event.target)) {
					setIsClicked(false);
					setTaskName({ id: 0, value: "" });
				}
			}

			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [ref]);
	}

	const newtaskRef = useRef(null);
	useOutside(newtaskRef);

	return (
		<BoardContainer>
			<BoardArea>
				<CardHeader>
					<CardHeaderContent dotColor={color} onClick={() => setShowDropdown(!showDropdown)}>
						{title}
					</CardHeaderContent>
					{boardItems.length > 0 ? (
						<ActiveTasks aria-describedby="Currently active" role="button">
							{boardItems.length}
						</ActiveTasks>
					) : null}
				</CardHeader>
				{showDropdown && (
					<DeleteBoardModal
						boardItems={boardItems}
						userId={userId}
						boardId={boardId}
						setDropdown={toggleDropdown}
					/>
				)}
				<Divider />
				<Cards>{children}</Cards>
				<NewTask ref={newtaskRef}>
					{isClicked && (
						<Form onSubmit={handleSubmit}>
							<motion.div
								key="formInput"
								variants={createTaskVariant}
								initial="initial"
								animate={isClicked ? "animate" : "initial"}
								exit="exit"
							>
								<Input
									id={boardId}
									type="text"
									placeholder="Task name"
									value={taskName.value || ""}
									onChange={onInputChange}
								/>
							</motion.div>
							<Button icon={<GoCheck size={18} />}>Add task</Button>
						</Form>
					)}
					{!isClicked && (
						<Button icon={<IoMdAdd size={16} />} onClick={handleClick}>
							Create new task
						</Button>
					)}
				</NewTask>
			</BoardArea>
		</BoardContainer>
	);
}
