import styled from "styled-components";

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.3);
	z-index: 99;
	backdrop-filter: blur(2px); // doesnt work in mozilla unless enabled!
`;

export default function Backdrop({ children, onClick }) {
	return <Wrapper onClick={onClick}>{children}</Wrapper>;
}
