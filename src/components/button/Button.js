import styled from "styled-components";

const BasicButton = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 15px;
	/* width: fit-content; */
	flex: 1;
	/* width: 100%; */

	button {
		background: #4d5deb;
		border: none;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px 22px;
		font-size: 0.75;
		font-weight: 600;
		color: #fff;
		cursor: pointer;
		transition: all 0.2s ease;
		position: relative;
		width: fit-content;
		border-radius: 20px;

		span {
			margin-right: 5px;
			position: relative;
			top: 1px;
		}

		&:hover {
			background-color: #3d4cd1;
		}
	}
`;

export const ButtonGroup = styled.div`
	display: flex;
	white-space: nowrap;
	justify-content: center;
`;

export default function Button({ children, icon, onClick, type, id }) {
	return (
		<BasicButton>
			<button onClick={onClick} type={type} id={id}>
				<span>{icon}</span>
				{children}
			</button>
		</BasicButton>
	);
}
