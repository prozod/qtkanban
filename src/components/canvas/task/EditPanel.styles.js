import styled from "styled-components";

export const EditTaskWrapper = styled.div`
	top: 0;
	right: 0;
	z-index: 10;
	position: fixed;
`;

export const Body = styled.section`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;
	margin-top: 2em;
`;

export const Footer = styled.section`
	display: flex;
	align-items: center;
	margin: 0;
	padding: 0;
	margin-bottom: 2em;
	width: 100%;
`;

export const Content = styled.div`
	margin: 0;
	padding: 0 2em;
	height: 100vh;
	width: fit-content;
	max-width: 40vw;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	align-items: flex-start;
	background: rgba(255, 255, 255, 1);
	filter: drop-shadow(2px 2px 7px rgba(0, 0, 0, 0.2));
	border-left: 1px solid #cccccc;

	button {
		width: fit-content;
		margin-right: 10px;
	}
`;

export const EditingArea = styled.div`
	width: 100%;
	height: fit-content;
	max-height: 500px;
	margin: 0 0 1.5em 0;
	border-radius: 10px;

	.ql-toolbar {
		border-radius: 10px 10px 0 0px;

		button {
			margin: 0;
		}
	}

	.ql-container {
		border-radius: 0 0px 10px 10px;
		height: 30vh;
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
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	font-size: 0.8rem;
	margin-bottom: 0.5em;
	color: #7d7d7d;

	p {
		margin: 0;
		padding: 0;
		padding: 2px 0;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;

		// if its empty make it red
		*[contenteditable="true"]:empty {
			background-color: lightcoral;
			min-width: 20px;
			border-radius: 20px;
			padding: 0 10px;
		}

		span {
			margin-right: 10px;
			font-weight: 600;
		}

		.icon {
			margin-left: 10px;
		}
	}
`;

export const Title = styled.span`
	text-transform: uppercase;
	font-weight: 600;
	margin: 0;
	margin-bottom: 0.5em;
	margin-top: 1.5em;

	font-size: 1rem;
	position: relative;
	text-align: center;

	&:before {
		position: absolute;
		content: "";
		width: 100%;
		height: 2px;
		background: #4d5deb;
		bottom: 0;
	}
`;
