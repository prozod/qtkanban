import styled from "styled-components";

const PrioritySelect = styled.select`
	display: flex;
	background: ${(props) => {
		if (props.priority === "high") {
			return "#ff4242";
		} else if (props.priority === "medium") {
			return "#ffbc36";
		} else {
			return "#4fd633";
		}
	}};
	border-radius: 20px;
	border: none;
	padding: 2px 4px;
	margin-left: 5px;
	color: ${(props) => {
		if (props.priority === "high") {
			return "white";
		} else {
			return "black";
		}
	}};
	font-weight: 600;
`;

const PriorityOption = styled.option`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 20px;
	border-radius: 20px;
	margin-left: 5px;
	background: #fff;
	font-size: 0.75rem;
	padding: 2px;
	color: ${(props) => {
		if (props.priority === "high") {
			return "black";
		} else {
			return "black";
		}
	}};
`;

export default function PriorityTag({ text = "high", onChange }) {
	return (
		<>
			<label htmlFor="priority">Priority</label>
			<PrioritySelect priority={text} value={text} onChange={onChange}>
				<PriorityOption name="high" value="high">
					High
				</PriorityOption>
				<PriorityOption name="medium" value="medium">
					Medium
				</PriorityOption>
				<PriorityOption name="low" value="low">
					Low
				</PriorityOption>
			</PrioritySelect>
		</>
	);
}

// just the wrapper to display elsewhere
const PriorityWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: fit-content;
	height: 20px;
	border-radius: 20px;
	padding: 2px 10px;
	font-weight: 600;
	font-size: 0.75rem;

	background: ${(props) => {
		if (props.priority === "high") {
			return "#ff4242";
		} else if (props.priority === "medium") {
			return "#ffbc36";
		} else {
			return "#4fd633";
		}
	}};

	color: ${(props) => {
		if (props.priority === "high") {
			return "white";
		} else {
			return "black";
		}
	}};
`;

export const PriorityTagWrapper = ({ text }) => {
	return <PriorityWrap priority={text}>{text}</PriorityWrap>;
};
