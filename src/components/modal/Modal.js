import React from "react";
import { ModalBackground, ModalWrapper } from "./Modal.styles";
import { Form, Input, Label, Textarea } from "./Form";
import Button from "../button/Button";
import { IoMdAdd } from "react-icons/io";

function Modal() {
	return (
		<ModalBackground>
			<ModalWrapper>
				<Form>
					<Label id="taskname" text="Task name" />
					<Input id="taskname" type="text" />

					<Label id="taskdetails" text="Task details" />
					<Textarea id="taskdetails" rows="10" cols="8" name="description" />

					<Button type="submit" icon={<IoMdAdd size={16} />}>
						Add
					</Button>
				</Form>
			</ModalWrapper>
		</ModalBackground>
	);
}

export default Modal;
