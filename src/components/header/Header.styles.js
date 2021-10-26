import styled from "styled-components";

export const Divider = styled.div`
	width: 100%;
	left: 0;
	height: 1px;
	background-color: #e3e4e6;
	margin: 1em 0 2em 0;
`;

export const HeaderWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

export const HeaderNavigation = styled.div`
	display: flex;
	align-items: center;
	margin: 1em 0;

	.panel {
		padding: 0;
		margin: 0;
		font-weight: 600;
		font-size: 1.25rem;
		color: #5c5c65;
	}
`;

export const BoardsNavigation = styled.div`
	display: flex;
	margin: 1em 0;

	.name {
		font-weight: 600;
		color: #5c5c65;
		margin: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: -5px;
		cursor: pointer;

		&:hover {
			text-decoration: underline;
		}
	}
`;
