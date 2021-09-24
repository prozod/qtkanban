import { useState } from "react";
import styled from "styled-components";
import Button from "../button/Button";
import { Input } from "../modal/Form";
import { IoMdAdd } from "react-icons/io";
import { changeState } from "../../features/taskSlice";
import { useDispatch, useSelector } from "react-redux";

const BoardArea = styled.div`
	border: 1px solid #e3e4e6;
	min-height: 300px;
	min-width: 200px;
	width: 15vw;
	max-width: 300px;
	overflow: hidden;
	font-family: "Fira Sans", sans-serif;
	margin-right: 10px;
	height: 100%;
	display: flex;
	flex-direction: column;
	margin-bottom: 15px;
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
`;

const NewTask = styled.div`
	position: relative;
	margin: 0 15px;
`;

export default function Board({ boardname, children, dotColor, id }) {
	//ADDING NEW TASK
	const [taskName, setTaskName] = useState();

	const onInputChange = e => {
		if (!taskName) return;
		setTaskName(e.target.value);
	};

	//REDUX
	const isActive = useSelector(state => state.task.isActive);
	const dispatch = useDispatch();
	const showInputField = e => {
		dispatch(changeState());
	};
	//

	return (
		<BoardArea>
			<CardHeader dotColor={dotColor}>
				<p>{boardname}</p>
			</CardHeader>

			<Cards>{children}</Cards>

			<NewTask>
				{isActive && (
					<Input
						id={id}
						type="text"
						placeholder="Task name"
						value={taskName}
						onChange={onInputChange}
					/>
				)}
				<Button id={id} icon={<IoMdAdd size={16} />} onClick={showInputField}>
					Create new issue
				</Button>
			</NewTask>
		</BoardArea>
	);
}
