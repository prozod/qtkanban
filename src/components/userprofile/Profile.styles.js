import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto;
	height: 100vh;
	width: 100vw;
	left: 0;
	position: absolute;
`;

export const ProfileCardWrapper = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	max-width: 500px;
	padding: 3em 2em;
	border: 1px solid #e3e4e6;
	font-family: "Fira Sans", sans-serif;
	filter: drop-shadow(1px 1px 5px rgba(0, 0, 0, 0.05));
	border-radius: 10px;
	background: white;

	@media (max-width: 768px) {
		flex-direction: column;
		width: fit-content;
	}
`;

export const Avatar = styled.div`
	display: flex;
	margin: 0;
	position: relative;
	transition: all 0.2 ease;

	img {
		margin: 0 auto;
		border-radius: 50%;
		outline: 3px solid #4d5deb;
		outline-offset: 5px;
		width: 100px;
		height: auto;
		object-fit: cover;
		background-position: center;
		aspect-ratio: 1 / 1;
	}
`;

export const UserInfo = styled.div`
	font-family: "Fira Sans", sans-serif;
	flex-direction: column;
	display: flex;
	justify-content: center;
	padding: 1em 2em;

	button {
		margin-top: 15px;
		width: fit-content;
	}

	@media (max-width: 768px) {
		margin-top: 2em;
	}
`;

export const UserName = styled.p`
	font-size: 0.75rem;
	margin: 0;
	padding: 0;

	span {
		font-weight: 600;
	}
`;

export const UserEmail = styled.p`
	font-size: 0.75rem;
	margin: 0;
	padding: 0;

	span {
		font-weight: 600;
	}
`;
