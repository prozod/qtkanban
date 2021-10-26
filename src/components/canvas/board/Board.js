import { useState } from "react";
import Button from "../../button/Button";
import { Form, Input } from "../../utilities/Form";
import { IoMdAdd } from "react-icons/io";
import { GoCheck, GoX } from "react-icons/go";
import { createNewTask } from "../../../firebase";
import {
	BoardContainer,
	BoardArea,
	CardHeader,
	Cards,
	NewTask,
	Divider,
	ButtonContainer,
} from "./Board.styles";
import { toast } from "react-toastify";

export default function Board({ userId, children, boardId, color, title, boardItems }) {
	const [taskName, setTaskName] = useState({ id: 0, value: "" });
	const [isClicked, setIsClicked] = useState(false);

	//Form handling for new tasks
	const handleClick = () => {
		setIsClicked(!isClicked);
	};

	const onInputChange = (e) => {
		const { id, value } = e.target;
		console.log(id, value);
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

	const closeInput = (e) => {
		if (e.target) {
			console.log("ye");
		} else {
			setIsClicked(false);
		}
	};

	return (
		<BoardContainer>
			<BoardArea>
				<CardHeader dotColor={color}>
					<p>
						{title} {boardItems.length > 0 ? <span>{boardItems.length}</span> : null}
					</p>
				</CardHeader>
				<Divider />
				<Cards>{children}</Cards>

				<NewTask onClick={closeInput}>
					{isClicked && (
						<Form onSubmit={handleSubmit}>
							<Input
								id={boardId}
								type="text"
								placeholder="Task name"
								value={taskName.value || ""}
								onChange={onInputChange}
							/>
							<ButtonContainer>
								<Button icon={<GoCheck size={18} />} />
								<Button icon={<GoX size={18} />} onClick={() => setIsClicked(false)} />
							</ButtonContainer>
						</Form>
					)}

					{!isClicked && (
						<Button icon={<IoMdAdd size={16} />} onClick={handleClick}>
							Create new issue
						</Button>
					)}
				</NewTask>
			</BoardArea>
		</BoardContainer>
	);
}

// onclickoutside, set isClicked to false so the create issue shows again
// collection(db, `users`, `${id}`, `tasks`),
