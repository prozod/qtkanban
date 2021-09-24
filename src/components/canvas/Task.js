import { memo } from "react";
import styled from "styled-components";

const TaskCard = styled.div`
	.task {
		padding: 10px;
		border: 1px solid ${props => (props.isDragging ? "#6a7df7" : "#e3e4e6")};
		margin: 5px 0;
		cursor: grab;
		position: relative;
		transition: all 0.2s ease;
		background-color: ${props => (props.isDragging ? "#dce0fa" : "white")};
		backface-visibility: hidden;
		transform: translateZ(0);

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
			background: ${props => (props.isDragging ? "#6a7df7" : "#454545")};
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
`;

export const Task = memo(function Task({ title, description, isDragging }) {
	return (
		<TaskCard isDragging={isDragging}>
			<div className="task">
				<p className="title">{title}</p>
				<p className="desc">{description}</p>
			</div>
		</TaskCard>
	);
});
