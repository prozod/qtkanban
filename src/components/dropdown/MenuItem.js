import styled from "styled-components";

const MenuItemStyle = styled.button`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding: 10px 15px;
	cursor: pointer;
	line-height: 5px;
	background: none;
	border: none;

	p {
		margin: 0;
		font-size: 0.8rem;
		font-weight: 600;
		margin-left: 10px;
	}

	&:hover {
		background: #ededed;
	}

	&:hover:last-child {
		border-radius: 0 0 10px 10px;
	}
`;

export default function MenuItem({ onClick, children }) {
	return <MenuItemStyle onClick={onClick}>{children}</MenuItemStyle>;
}
