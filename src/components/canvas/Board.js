import { useState } from "react";
import styled from "styled-components";
import Button from "../button/Button";
import { Form, Input } from "../modal/Form";
import { IoMdAdd } from "react-icons/io";
import { GoCheck } from "react-icons/go";
import { updateUserBoard } from "../../firebase";
import { arrayUnion } from "@firebase/firestore";

const BoardContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex: 1;
`;

const BoardArea = styled.div`
	border: 1px solid #e3e4e6;
	min-height: 300px;
	min-width: 200px;
	width: 15vw;
	max-width: 300px;
	overflow: hidden;
	font-family: "Fira Sans", sans-serif;
	margin-right: 10px;
	height: auto;
	display: flex;
	margin-bottom: 15px;
	flex-direction: column;
`;

const CardHeader = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 5px 0px;

	p {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.5rem;
		text-align: center;
		font-weight: 600;
		position: relative;
		margin: 1em 0;

		&:before {
			content: "";
			position: absolute;
			left: -20px;
			width: 15px;
			height: 15px;
			border-radius: 50%;
			background-color: ${props => (props.dotColor ? props.dotColor : "")};
		}
		&:after {
			content: "";
			position: absolute;
			left: -16px;
			width: 7px;
			height: 7px;
			border-radius: 50%;
			background-color: #f5f6f8;
		}
	}
`;

const Cards = styled.div`
	position: relative;
	margin: 10px 15px;

	.emptyboard {
		margin: 0 auto;
		display: flex;
		width: 100%;
		justify-content: center;
		padding: 1em 0;
		color: #636363;
	}
`;

const NewTask = styled.div`
	position: relative;
	margin: 0 15px;
`;

export default function Board({ userId, children, boardId, color, title }) {
	//ADDING NEW TASK
	const [taskName, setTaskName] = useState({ id: 0, value: "" });
	const [isClicked, setIsClicked] = useState(false);

	//Form handling for new tasks
	const handleClick = () => {
		setIsClicked(!isClicked);
	};

	const onInputChange = e => {
		const { id, value } = e.target;
		console.log(id, value);
		setTaskName({ id: id, value: value });
	};

	const handleSubmit = async e => {
		e.preventDefault();
		if (!taskName) return;
		updateUserBoard(userId, taskName.id, {
			items: arrayUnion({ title: taskName.value })
		});

		setIsClicked(false);
	};

	return (
		<BoardContainer>
			<BoardArea>
				<CardHeader dotColor={color}>
					<p>{title}</p>
				</CardHeader>

				<Cards>{children}</Cards>

				<NewTask>
					{isClicked && (
						<Form onSubmit={handleSubmit}>
							<Input
								id={boardId}
								type="text"
								placeholder="Task name"
								value={taskName.value || ""}
								onChange={onInputChange}
							/>
							<Button icon={<GoCheck />} />
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
