import styled from "styled-components";

export const Wrapper = styled.nav`
	display: none;
	@media (max-width: 768px) {
		display: flex;
		justify-content: space-evenly;
		position: fixed;
		width: 100%;
		left: 0;
		z-index: 5;
		bottom: 0;
		backdrop-filter: blur(10px);
	}
`;

export const NavItem = styled.div`
	display: flex;
	padding: 1em 0;
	margin: 0;

	a {
		padding: 0;
		margin: 0;
		text-decoration: none;
		color: black;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
	}

	button {
		border: none;
		background: none;
		color: black;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
	}
`;
