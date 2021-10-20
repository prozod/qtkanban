import Button from "../button/Button";
import { FcGoogle } from "react-icons/fc";
import styled from "styled-components";
import qtlogo from "../../images/qt.png";
import { useHistory, withRouter } from "react-router";

const Wrapper = styled.section`
	width: fit-content;
	height: 100%;
	padding: 5em 1em;
	display: flex;
	flex-direction: column;
	margin: 15% auto;
	font-family: "Fira Sans", sans-serif;
`;

const Header = styled.div`
	display: flex;
	align-items: center;

	img {
		width: 30px;
		height: 30px;
		margin-right: 10px;
	}
`;

const Subheader = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	font-size: 0.85rem;
	color: darkgray;
	margin-bottom: 3em;

	p {
		margin: 0;
		padding: 0;
	}
`;

const LogIn = ({ action, isLogged }) => {
	let history = useHistory();
	if (isLogged) history.push("/boards");

	return (
		<Wrapper>
			<Header>
				<img src={qtlogo} alt="quicktools-boards" />
				<h1>Quicktools Boards</h1>
			</Header>
			<Subheader>
				<p>In order to use the boards, you need to create an account.</p>
				<p>We use Google Authentication, therefore things are lightning fast!</p>
			</Subheader>
			<Button onClick={action} icon={<FcGoogle />}>
				Log In with Google
			</Button>
		</Wrapper>
	);
};

export default withRouter(LogIn);
