import styled from "styled-components";

export const EditTaskWrapper = styled.div`
	top: 0;
	right: 0;
	position: fixed;
	z-index: 100;
`;

export const Content = styled.div`
	margin: 0;
	padding: 0 3em;
	height: 100vh;
	width: fit-content;
	max-width: 45vw;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	align-items: flex-start;
	background: rgba(255, 255, 255, 1);
	filter: drop-shadow(2px 2px 7px rgba(0, 0, 0, 0.2));
	border-left: 1px solid #cccccc;

	@media (max-width: 768px) {
		max-width: 100vw;
		height: 100vh;
		overflow: hidden;
		justify-content: center;
		padding: 0 3em;
	}
`;

export const Body = styled.section`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;
	margin-top: 2em;

	@media (max-width: 768px) {
		margin-top: 0;
	}
`;

export const Footer = styled.section`
	display: flex;
	align-items: center;
	margin: 0;
	padding: 0;
	margin-bottom: 2em;
	width: 100%;

	button {
		width: fit-content;
		margin-right: 10px;
	}
`;

export const EditingArea = styled.div`
	height: fit-content;
	max-height: 500px;
	width: 100%;
	margin: 0 0 1.5em 0;
	border-radius: 10px;

	.quill {
		@media (max-width: 768px) {
			max-width: 275px;
		}
	}

	.ql-toolbar {
		border-radius: 10px 10px 0 0px;

		button {
			margin: 0;
		}
	}

	.ql-container {
		border-radius: 0 0px 10px 10px;
		height: 30vh;

		@media (max-width: 768px) {
			height: 20vh;
		}
	}
`;

export const TaskInfo = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	font-family: "Fira Sans", sans-serif;
`;

export const TaskItem = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 0.8rem;
	margin-bottom: 0.5em;
	color: #7d7d7d;
	padding: 5px 0;

	span {
		margin-right: 10px;
	}

	.icon {
		display: flex;
		border: 1px solid #7d7d7d;
		padding: 5px;
		border-radius: 50%;
	}
`;

export const Priority = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 50px;
	height: 20px;
	background: #ff4242;
	border-radius: 20px;
	margin-left: 5px;

	p {
		font-size: 0.75rem;
		color: white;
		font-weight: 600;
	}
`;

export const DateWrapper = styled.div`
	display: flex;
	align-items: center;
	padding: 0 0px 0 0;
	border-radius: 20px;

	&:hover {
		background-color: #f0f0f0;
		cursor: pointer;
	}

	input {
		padding: 5px 10px;
		border-radius: 20px;
		border: 1px solid #7d7d7d;
		color: #6e6e6e;

		&:focus {
			outline: 2px solid #4d5deb;
			background-color: #f0f0f0;
			color: black;
		}
	}
`;

export const Title = styled.div`
	font-weight: 600;
	margin: 0;
	margin-bottom: 0.5em;
	margin-top: 1.5em;
	font-size: 1rem;
	position: relative;
	text-align: center;

	p {
		margin: 0;
		padding: 0;
		font-size: 1.5rem;
	}

	*[contenteditable="true"] {
		min-width: 50px;
		border-radius: 20px;
		padding: 2.5px 10px 2.5px 0px;
		outline-color: #4d5deb;
	}

	// if its empty make it red
	*[contenteditable="true"]:empty {
		outline: 2px solid red;
	}
`;
