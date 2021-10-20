import React from "react";
import { SidebarContainer, Icon, UserProfilePicture, Top, Bottom } from "./Sidebar.styles";
import { HiMenu, HiClipboardList } from "react-icons/hi";
import { IoExitOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Sidebar({ logout }) {
	const user = useSelector((state) => state?.user.value);

	return (
		<SidebarContainer>
			<Top>
				<Icon>
					<HiMenu size={26} title="Menu" />
				</Icon>
				<Link to="/boards">
					<Icon>
						<HiClipboardList size={26} title="Tasks" />
					</Icon>
				</Link>
			</Top>
			<Bottom>
				{user.isLogged ? (
					<Icon>
						<IoExitOutline onClick={logout} size={26} title="Logout" />
					</Icon>
				) : null}
				{user.isLogged ? (
					<Link to="/account">
						<UserProfilePicture>
							<img src={user.photo_url} alt={user.username} />
						</UserProfilePicture>
					</Link>
				) : null}
			</Bottom>
		</SidebarContainer>
	);
}
