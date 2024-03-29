import styled from "styled-components";

export const TaskCard = styled.div`
	.task {
		padding: 10px;
		border: 1px solid ${(props) => (props.isDragging ? "#6a7df7" : "#e3e4e6")};
		margin: 5px 0;
		cursor: grab;
		position: relative;
		transition: all 0.2s ease;
		background-color: ${(props) => (props.isDragging ? "#dce0fa" : "white")};
		backface-visibility: hidden;
		transform: translateZ(0);
		line-height: 18px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 10px;

		.moreOptions {
			border: none;
			background: none;
			cursor: pointer;
			margin: 0;
			padding: 2.5px 5px;
			border-radius: 15%;
			transition: all 0.2s ease;
			position: relative;

			&:hover {
				background-color: #e8e8e8;
				cursor: pointer;
			}

			&:focus {
				background-color: #e8e8e8;
			}
		}

		&:hover {
			filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.1));
		}

		&:before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 3px;
			height: 100%;
			background: ${(props) => (props.isDragging ? "#6a7df7" : "#454545")};
			transition: all 0.1s ease;
		}

		&:hover:before {
			width: 6px;
			left: -3px;
		}

		.title {
			margin: 0;
			font-weight: 600;
		}

		.desc {
			margin: 0;
			font-size: 0.8rem;
		}

		.status {
			text-transform: uppercase;
			font-size: 0.75rem;
		}
	}

	.taskContent {
		width: 100%;
	}
`;

export const DueToDate = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: fit-content;
	height: fit-content;
	border-radius: 20px;
	padding: 2px 10px;
	font-weight: 600;
	font-size: 0.75rem;
	background-color: #e3e4e6; ;
`;

export const TaskExtraDetails = styled.div`
	margin-top: 0.5em;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
