import React from "react";
import styled from "styled-components";
import Button from "../button/Button";
import { IoExitOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import userAvatar from "../../images/useravatar.webp";

const Wrapper = styled.div`
	display: flex;
	height: 100vh;
	width: 100%;
	justify-content: center;
	margin: auto 0;
	align-items: center;
`;

const ProfileCardWrapper = styled.div`
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

const Avatar = styled.div`
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

const UserInfo = styled.div`
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

const UserName = styled.p`
	font-size: 1rem;
	margin: 0;
	padding: 0;

	span {
		font-size: 1rem;
		font-weight: 600;
	}
`;

const UserEmail = styled.p`
	font-size: 1rem;
	margin: 0;
	padding: 0;

	span {
		font-size: 1rem;
		font-weight: 600;
	}
`;

export default function UserProfile({ logout }) {
	const user = useSelector((state) => state?.user.value);
	console.log(user);
	return (
		<Wrapper>
			<ProfileCardWrapper>
				<Avatar>
					<img src={user.photo_url || userAvatar} alt={user.username} />
				</Avatar>
				<UserInfo>
					<UserName>
						You are logged in as <span>{user.username}</span>
					</UserName>
					<UserEmail>
						Email: <span>{user.email}</span>
					</UserEmail>
					<Button onClick={logout} icon={<IoExitOutline size={16} />}>
						Log out
					</Button>
				</UserInfo>
			</ProfileCardWrapper>
		</Wrapper>
	);
}
