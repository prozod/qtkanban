import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	height: 100vh;
	width: 100%;
	justify-content: center;
	margin: auto 0;
	align-items: center;
`;

export const ProfileCardWrapper = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	max-width: 500px;
	padding: 3em 1.5em;
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

	button {
		margin-top: 15px;
		width: fit-content;
	}

	@media (max-width: 768px) {
		margin-top: 2em;
	}
`;

export const UserName = styled.p`
	font-size: 1rem;
	margin: 0;
	padding: 0;

	span {
		font-size: 1rem;
		font-weight: 600;
	}
`;

export const UserEmail = styled.p`
	font-size: 1rem;
	margin: 0;
	padding: 0;

	span {
		font-size: 1rem;
		font-weight: 600;
	}
`;
