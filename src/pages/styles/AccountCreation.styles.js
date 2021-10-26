import styled from "styled-components";

export const Wrapper = styled.section`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: "Fira Sans", sans-serif;
	background-color: #f6f8f9;
	left: 0;
	top: 0;
	position: fixed;

	@media (max-width: 768px) {
		width: 100%;
	}
`;

export const Divider = styled.div`
	display: flex;
	margin: 0 auto;
	width: 100%;
	height: 1px;
	background-color: #e3e4e6;
	margin: 1.5em 0;
`;

export const DividerGroup = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	p {
		margin: 0 5px;
		font-size: 0.75rem;
		height: fit-content;
		color: darkgray;
	}
`;

export const Box = styled.div`
	display: flex;
	flex-direction: column;
	filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.1));
	padding: 1.5em 3em 1.5em 3em;
	background-color: white;
	border-radius: 10px;
	max-width: 350px;
	width: 100%;


	.NewAccount {
		color: #1f1f1f;
		margin: 0 auto;
		font-size: 1.5rem;

		@media (max-width: 768px) {
			font-size: 1rem;
			height: 100%;

	}
`;

export const Header = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	margin-bottom: 1.5em;

	h1 {
		font-size: 1rem;
		font-weight: 600;
		color: #1f1f1f;
		/* text-transform: uppercase; */
	}

	img {
		width: 25px;
		height: 25px;
		margin-right: 10px;
	}
`;

export const GoogleSignUp = styled.div`
	button {
		background: transparent;
		border: 1.5px solid #4d5deb;
		color: #4d5deb;

		&:hover {
			background-color: #3d4cd1;
			color: white;
		}
	}
`;

export const UniqueFormWrapper = styled.div`
	color: #2b2b2b;
	display: flex;
	flex-direction: column;

	label {
		text-transform: none;
	}

	button {
		margin-top: 2em;

		span {
			margin: 0px 5px;
		}
	}

	.forgottenpassword {
		font-size: 0.75rem;
		margin: 0;
	}

	.registerAnchor {
		font-size: 0.75rem;
		margin: 10px auto;
		color: #1f1f1f;
		text-decoration: none;
		font-weight: 400;

		span {
			font-weight: 500;
		}

		&:hover {
			text-decoration: underline;
		}
	}
`;
