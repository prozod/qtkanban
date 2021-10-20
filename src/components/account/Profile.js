import React from "react";
import styled from "styled-components";
import Button from "../button/Button";
import { IoExitOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const ProfileCardWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 15% 0;
	padding: 3em 1.5em;
	border: 1px solid #e3e4e6;
	font-family: "Fira Sans", sans-serif;
`;

const ProfileHeader = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0;

	p {
		font-size: 1.5rem;
		margin: 0;
		padding: 0;
		margin-top: 1em;
	}

	span {
		font-size: 1.5rem;
		font-weight: 600;
	}

	img {
		margin: 0 auto;
		border-radius: 50%;
		border: 1px solid #e3e4e6;
		width: 125px;
		height: auto;
	}
`;

export default function Profile({ logout }) {
	const user = useSelector((state) => state?.user.value);

	return (
		<ProfileCardWrapper>
			<ProfileHeader>
				<img src={user.photo_url} alt={user.username} />
				<p>
					You are logged in as <span>{user.username}</span>
				</p>
			</ProfileHeader>
			<p>
				Email: <span>{user.email}</span>
			</p>
			<Button onClick={logout} icon={<IoExitOutline size={16} />}>
				Log out
			</Button>
		</ProfileCardWrapper>
	);
}
