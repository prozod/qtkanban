import { useState } from "react";
import Backdrop from "../../../utilities/Backdrop";
import styled from "styled-components";
import { Input, Label, Form } from "../../../utilities/Form";
import Button from "../../button/Button";
import { SliderPicker } from "react-color";
import { toast } from "react-toastify";
import { createNewBoard } from "../../../firebase";
import { useSelector } from "react-redux";
import { GoX } from "react-icons/go";
import { motion } from "framer-motion";

const ModalWrapper = styled.div`
	display: flex;
	flex-direction: column;
	background-color: white;
	font-family: "Fira Sans", sans-serif;
	max-width: 250px;
	max-width: 300px;
	width: 100%;
	height: fit-content;
	border-radius: 20px;
	padding: 1em 2em;
	border: 1px solid rgba(255, 255, 255, 0.5);
	filter: drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.1));

	label {
		text-transform: none;
		font-size: 0.75rem;
	}

	.ModalTitle {
		text-transform: uppercase;
		color: #5c5c65;
		font-size: 0.75rem;
		font-weight: 600;
		padding: 0;
		margin: 0;
		margin-bottom: 2em;
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
		width: 100vw;
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

export default function CreateBoardModal({ closeModal, setToggle }) {
	const [pickedColor, setPickedColor] = useState("");
	const [boardName, setBoardName] = useState("");
	const user = useSelector((state) => state?.user.value);

	function handleChange(color, event) {
		setPickedColor(color.hex);
	}

	function onBoardNameChange(e) {
		setBoardName(e.target.value);
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
			setToggle(false);
		}
	}

	const modalVariants = {
		initial: {
			position: "absolute",
			opacity: 0,
			transform: "scale(0.7)",
		},
		animate: {
			position: "absolute",
			transform: "scale(1)",
			opacity: 1,
			transition: {
				type: "tween",
				duration: 0.25,
				when: "afterChildren",
			},
		},
	};

	return (
		<Backdrop onClick={closeModal}>
			<motion.div
				variants={modalVariants}
				initial="initial"
				animate={closeModal ? "animate" : "initial"}
			>
				<ModalWrapper onClick={(e) => e.stopPropagation()}>
					<div className="ModalTitle">
						<p>Create a new board</p>
						<span onClick={closeModal}>
							<GoX title="Close modal" />
						</span>
					</div>

					<Form onSubmit={handleSubmit}>
						<Label id="boardname" text="Name" />
						<Input id="boardname" value={boardName} onChange={onBoardNameChange} />
						<ColorPicker>
							<Label text="Color" />
							<span>
								<SliderPicker triangle="hide" color={pickedColor} onChange={handleChange} />
							</span>
						</ColorPicker>
						<Button type="submit" className="Btn">
							Create board
						</Button>
					</Form>
				</ModalWrapper>
			</motion.div>
		</Backdrop>
	);
}
