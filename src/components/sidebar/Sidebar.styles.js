import styled from "styled-components";

export const Divider = styled.div`
	width: 100%;
	height: 1px;
	background-color: #e3e4e6;
`;

export const SidebarContainer = styled.nav`
	position: fixed;
	left: 0;
	top: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 60px;
	height: 100%;
	background-color: #19214f;
	color: white;
	filter: drop-shadow(2px 0 5px rgba(0, 0, 0, 0.2));
	z-index: 1;
`;

export const Icon = styled.div`
	padding: 0.9em 0;
	margin: 0.5em 0;
	cursor: pointer;
	position: relative;
	display: flex;
	justify-content: center;
	transition: all 0.15s ease;
	width: 100%;

	&:hover {
		background-color: #4e8cf2;
	}
`;
