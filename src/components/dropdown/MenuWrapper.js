import styled from "styled-components";

const MenuWrapperStyle = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 300px;
	min-width: 150px;
	width: fit-content;
	height: fit-content;
	background: white;
	position: absolute;
	z-index: 10;
	border: 1px solid #e3e4e6;
	border-radius: 10px;
	padding: 0;
	margin: 0;
	right: ${(props) => (props.right ? 0 : "")};
	filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.1));
`;

export default function MenuWrapper({ children, right }) {
	return (
		<MenuWrapperStyle right={right} onClick={(e) => e.stopPropagation()}>
			{children}
		</MenuWrapperStyle>
	);
}
