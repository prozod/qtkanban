import styled from "styled-components";

const BasicButton = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 15px;
	width: fit-content;
	flex: 1;
	width: 100%;

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
		/* border: 1px solid #e3e4e6; */

		position: relative;
		width: 100%;
		border-radius: 10px;

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
