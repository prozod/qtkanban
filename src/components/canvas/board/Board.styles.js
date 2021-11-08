import styled from "styled-components";

export const BoardContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex: 1;
`;

export const Divider = styled.div`
	width: 85%;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 1px;
	background-color: #e3e4e6;
	margin: 0 auto;
`;

export const BoardArea = styled.div`
	border: 1px solid #e3e4e6;
	min-height: 200px;
	min-width: 250px;
	width: 15vw;
	max-width: 300px;
	/* overflow: hidden; */
	font-family: "Fira Sans", sans-serif;
	margin-right: 10px;
	height: auto;
	display: flex;
	margin-bottom: 15px;
	flex-direction: column;
	border-radius: 20px;
`;

export const CardHeader = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
	padding: 5px 0px 5px 35px;
	font-family: "Fira Sans", sans-serif;

	p {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 1rem;
		text-align: center;
		font-weight: 600;
		width: 100%;
		position: relative;
		flex: 1;
		margin: 1em 0;

		span {
			display: flex;
			margin: 0;
			padding: 0;
			font-weight: 600;
			font-size: 0.85rem;
			background-color: #e3e4e6;
			padding: 5px 10px;
			border-radius: 50%;
			margin-right: 15px;
		}

		&:before {
			content: "";
			position: absolute;
			left: -15px;
			width: 10px;
			height: 10px;
			border-radius: 50%;
			background-color: ${(props) => (props.dotColor ? props.dotColor : "")};
		}
		&:after {
			content: "";
			position: absolute;
			left: -12px;
			width: 4px;
			height: 4px;
			border-radius: 50%;
			background-color: #f5f6f8;
		}
	}
`;

export const Cards = styled.div`
	position: relative;
	margin: 10px 15px;

	.emptyboard {
		margin: 0 auto;
		display: flex;
		width: 100%;
		justify-content: center;
		padding: 1em 0;
		color: #636363;
	}
`;

export const NewTask = styled.div`
	position: relative;
	margin: 0 15px;

	button {
		width: 100vw;
	}
`;
