import React from "react";
import { SidebarContainer, Icon, UserProfilePicture, Top, Bottom } from "./Sidebar.styles";
import { IoMenuOutline, IoDocumentsOutline, IoExitOutline } from "react-icons/io5";
import userAvatar from "../../images/useravatar.webp";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Sidebar({ logout }) {
	const user = useSelector((state) => state?.user.value);

	return (
		<SidebarContainer>
			<Top>
				<Icon>
					<IoMenuOutline size={24} title="Menu" />
				</Icon>
				<Link to="/boards">
					<Icon>
						<IoDocumentsOutline size={24} title="Tasks" />
					</Icon>
				</Link>
			</Top>
			<Bottom>
				{user.isLogged ? (
					<Icon>
						<IoExitOutline onClick={logout} size={24} title="Logout" />
					</Icon>
				) : null}
				{user.isLogged ? (
					<Link to="/account">
						<UserProfilePicture>
							<img src={user.photo_url || userAvatar} alt={user.username} />
						</UserProfilePicture>
					</Link>
				) : null}
			</Bottom>
		</SidebarContainer>
	);
}
