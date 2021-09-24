import styled from "styled-components";

export const ModalBackground = styled.div`
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
	background-color: rgba(0, 0, 0, 0.7);
	position: absolute;
	top: 0;
	left: 0;
	z-index: 5;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ModalWrapper = styled.div`
	display: flex;
	z-index: 10;
	background-color: white;
	min-width: 200px;
	width: 20vw;
	min-height: 300px;
	height: 45vh;
	padding: 1em 2em;
	border: 1px solid #19214f;
	border-radius: 5px;
`;
