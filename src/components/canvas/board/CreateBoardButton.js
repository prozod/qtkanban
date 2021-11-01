import { IoAdd } from "react-icons/io5";
import styled from "styled-components";

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: auto;
`;

const AddIcon = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	margin: 0 1em;
	padding: 5px 10px;
	transition: all 150ms ease;
	background-color: #e3e4e6;
	border-radius: 10px;

	span {
		color: #5c5c65;
		margin: 0;
		padding: 0;
		line-height: 10px;
	}

	p {
		font-size: 0.75rem;
		font-weight: 600;
		color: #5c5c65;
		margin: 0;
		padding: 0;
	}

	&:hover {
		background-color: lightgray;

		span {
			color: gray;
		}
	}
`;

function CreateBoard({ onClick }) {
	return (
		<Wrapper>
			<AddIcon onClick={onClick}>
				<span>
					<IoAdd size={15} title="Add a new board" />
				</span>
				<p>Add board</p>
			</AddIcon>
		</Wrapper>
	);
}

export default CreateBoard;
