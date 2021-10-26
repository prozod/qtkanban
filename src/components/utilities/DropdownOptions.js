import styled from "styled-components";

const MenuWrapper = styled.div`
	display: flex;
	width: 150px;
	height: 300px;
	background: white;
	position: absolute;
	z-index: 99999999;
`;

export const Menu = () => {
	return (
		<MenuWrapper>
			<h1>TEST</h1>
		</MenuWrapper>
	);
};
