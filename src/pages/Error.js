import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/button/Button";
import qtlogo from "../images/qt.png";

const Wrapper = styled.section`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	flex: 1;
	justify-content: center;
	align-items: center;
	margin: 0;
	font-family: "Fira Sans", sans-serif;
`;

const Content = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.1));
	padding: 3em;
	background-color: white;
	border-radius: 10px;
	max-width: 350px;
	width: 100%;

	img {
		width: 50px;
		height: auto;
		margin: 0;
	}

	h1 {
		margin: 0;
		margin: 1em 0 1em 0;
	}

	p {
		margin: 0;
		padding: 0;
		font-size: 0.8rem;
	}

	a {
		text-decoration: none;
		margin: 0;
		padding: 0;
	}

	button {
		margin: 0;
		margin: 3em 0 0 0;
	}
`;

const Error = () => {
	return (
		<Wrapper>
			<Content>
				<img src={qtlogo} alt="quicktools" />
				<h1>You seem lost!</h1>
				<p>We couldn't find this specific page.</p>
				<p>Make sure the address or URL is correct and try again!</p>
				<Link to="/">
					<Button>Go home</Button>
				</Link>
			</Content>
		</Wrapper>
	);
};

export default Error;
