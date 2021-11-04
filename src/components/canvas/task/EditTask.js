import styled from "styled-components";
import Button, { ButtonGroup } from "../../button/Button";
import { useDispatch } from "react-redux";
import { editActive } from "../../../features/editSlice";
import { dragDisabled } from "../../../features/draggingSlice";
import { useRef, useEffect } from "react";

const EditTaskWrapper = styled.div`
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	top: 0;
	right: 0;
	z-index: 10;
`;

const Content = styled.div`
	margin: 0;
	padding: 0;
	height: 100vh;
	width: 40vw;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	flex: 1;
	background: rgba(255, 255, 255, 1);
	filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.1));
	border-left: 1px solid #f5f6f8;

	button {
		width: fit-content;
		margin: 0 5px;
	}
`;

const EditTask = ({ title, task }) => {
	const dispatch = useDispatch();
	const editMenuRef = useRef();

	function useOutside(ref) {
		useEffect(() => {
			function handleClickOutside(event) {
				if (ref.current && !ref.current.contains(event.target)) {
					dispatch(dragDisabled(false));
					dispatch(editActive(false));
				}
			}

			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [ref]);
	}

	useOutside(editMenuRef);

	return (
		<EditTaskWrapper ref={editMenuRef}>
			<Content>
				<div>
					<span>Title: </span>
					<h1>{task.name}</h1>
				</div>
				<div>
					<span>Description: </span>
					{task.id}
				</div>

				<ButtonGroup>
					<Button
						onClick={() => {
							dispatch(dragDisabled(false));
							dispatch(editActive(false));
						}}
					>
						Save changes
					</Button>
					<Button
						onClick={() => {
							dispatch(dragDisabled(false));
							dispatch(editActive(false));
						}}
					>
						Close
					</Button>
				</ButtonGroup>
			</Content>
		</EditTaskWrapper>
	);
};

export default EditTask;
