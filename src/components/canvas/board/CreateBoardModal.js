import { useState } from "react";
import Backdrop from "../../utilities/Backdrop";
import styled from "styled-components";
import { Input, Label, Form } from "../../utilities/Form";
import Button from "../../button/Button";
import { GithubPicker } from "react-color";
import { toast } from "react-toastify";
import { createNewBoard } from "../../../firebase";
import { useSelector } from "react-redux";
import { GoX } from "react-icons/go";

const ModalWrapper = styled.div`
	display: flex;
	flex-direction: column;
	background-color: white;
	font-family: "Fira Sans", sans-serif;
	max-width: 250px;
	max-width: 300px;
	width: 100%;
	height: fit-content;
	border-radius: 10px;
	padding: 1em 2em;
	border: 1px solid rgba(255, 255, 255, 0.5);
	filter: drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.1));

	.ModalTitle {
		font-weight: 600;
		color: #5c5c65;
		font-size: 1rem;
		padding: 0;
		margin: 0;
		margin-bottom: 1.5em;
		display: flex;
		align-items: center;
		justify-content: space-between;

		span {
			display: flex;
			align-items: center;
			border: 1px solid #5c5c65;
			padding: 5px;
			border-radius: 50%;
			transition: all 0.2s ease;

			&:hover {
				background-color: #3d4cd1;
				color: white;
				cursor: pointer;
			}
		}
	}

	button {
		margin-top: 1.5em;
	}
`;

const ColorPicker = styled.div`
	display: flex;
	flex-direction: column;
	line-height: 5px;
	margin: 1em 0;

	label {
		margin-bottom: 10px;
	}
`;

export default function CreateBoardModal({ closeModal }) {
	const [pickedColor, setPickedColor] = useState("");
	const [boardName, setBoardName] = useState("");
	const user = useSelector((state) => state?.user.value);

	function handleChange(color, event) {
		console.log(event);
		setPickedColor(color.hex);
	}

	function onBoardNameChange(e) {
		setBoardName(e.target.value);
		console.log(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (boardName.trim().length < 3) {
			toast.error("Board name must be at least 3 characters long.");
		} else if (pickedColor === "" || boardName === "") {
			toast.error("Board name and color are mandatory!");
		} else {
			createNewBoard(user.id, {
				board_id: boardName.split(/\s/).join("").trim().toLowerCase(),
				color: pickedColor,
				id: "",
				items: [],
				title: boardName,
			});

			console.log(pickedColor, user.id, boardName);
		}
	}

	return (
		<Backdrop onClick={closeModal}>
			<ModalWrapper onClick={(e) => e.stopPropagation()}>
				<div className="ModalTitle">
					<p>Create a new board</p>
					<span onClick={closeModal}>
						<GoX title="Close modal" />
					</span>
				</div>
				<Form onSubmit={handleSubmit}>
					<Label id="boardname" text="Board name" />
					<Input id="boardname" value={boardName} onChange={onBoardNameChange} />
					<ColorPicker>
						<Label text="Board color" />
						<span>
							<GithubPicker triangle="hide" color={pickedColor} onChange={handleChange} />
						</span>
					</ColorPicker>
					<Button type="submit" className="Btn">
						Create board
					</Button>
				</Form>
			</ModalWrapper>
		</Backdrop>
	);
}
