import React from "react";
import { SidebarContainer, Divider, Icon } from "./Sidebar.styles";
import { HiMenu, HiClipboardList } from "react-icons/hi";

export default function Sidebar() {
	return (
		<SidebarContainer>
			<Icon>
				<HiMenu size={26} title="Menu" />
			</Icon>
			<Divider />
			<Icon>
				<HiClipboardList size={26} title="Tasks" />
			</Icon>
		</SidebarContainer>
	);
}
