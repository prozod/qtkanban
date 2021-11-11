import React from "react";
import Button from "../button/Button";
import { IoExitOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import userAvatar from "../../images/useravatar.webp";
import { motion } from "framer-motion";
import {
	Wrapper,
	ProfileCardWrapper,
	Avatar,
	UserInfo,
	UserName,
	UserEmail,
} from "./Profile.styles";

export default function UserProfile({ logout }) {
	const user = useSelector((state) => state?.user.value);

	return (
		<Wrapper>
			<motion.div
				key="boards"
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
			>
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
			</motion.div>
		</Wrapper>
	);
}
