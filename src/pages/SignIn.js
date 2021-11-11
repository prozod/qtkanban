import Button from "../components/button/Button";
import { FcGoogle } from "react-icons/fc";
import {
	Wrapper,
	Box,
	Header,
	GoogleSignUp,
	Divider,
	DividerGroup,
	UniqueFormWrapper,
} from "./styles/Account.styles";
import qtlogo from "../images/qt.png";
import { Redirect, useHistory, withRouter } from "react-router";
import { toast } from "react-toastify";
import { signInWithPopup, getAdditionalUserInfo, signInWithEmailAndPassword } from "firebase/auth";
import { auth, provider, createNewUserDocumentWithGoogle } from "../firebase";
import { Input, Label, Form } from "../utilities/Form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BOARDS } from "../constants/routes";

const SignIn = () => {
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");
	let history = useHistory();
	if (auth.currentUser !== null) return <Redirect to={BOARDS} />;

	// log in with email and password
	function logInWithEmailAndPw(e) {
		e.preventDefault();

		signInWithEmailAndPassword(auth, userEmail, userPassword)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				// ...
				toast.success(`Welcome back, ${user.displayName}!`);
				history.push({ BOARDS });
			})
			.catch((error) => {
				if (error.code === "auth/user-not-found") {
					toast.error("Try again! We couldn't find any user with those credentials!");
				} else if (error.code === "auth/invalid-email") {
					toast.error("Invalid email address.");
				} else if (error.code === "auth/wrong-password") {
					toast.error("Wrong password! Try again.");
				} else {
					console.log(error.code, error.message);
				}
			});
	}

	// log in or create account with Google Auth
	function logIn() {
		signInWithPopup(auth, provider)
			.then((res) => {
				const user = res.user;
				if (getAdditionalUserInfo(res).isNewUser) {
					createNewUserDocumentWithGoogle(user);
					console.log(`New user created with document UID: ${user.uid}`);
				}
				history.push("/boards");
				toast.success("Logged in successfully!");
			})
			.catch((error) => {
				toast.error("Wooops! An error occured. Try again.");
				console.error(error.message);
			});
	}

	return (
		<Wrapper>
			<Box>
				<Header>
					<img src={qtlogo} alt="quicktools-boards" />
					<h1>Quicktools Boards</h1>
				</Header>
				<GoogleSignUp>
					<Button className="googlesignup" onClick={logIn} icon={<FcGoogle />}>
						Log In / Sign Up with Google
					</Button>
				</GoogleSignUp>
				<DividerGroup>
					<Divider />
					<p>OR</p>
					<Divider />
				</DividerGroup>

				<UniqueFormWrapper>
					<Form onSubmit={logInWithEmailAndPw}>
						<Label id="email" text="Email address" />
						<Input
							required
							type="text"
							value={userEmail}
							onChange={(e) => setUserEmail(e.target.value)}
						/>
						<Label id="password" text="Password" />
						<Input
							required
							type="password"
							value={userPassword}
							onChange={(e) => setUserPassword(e.target.value)}
						/>
						<p className="forgottenpassword">Forgot your password?</p>
						<Button type="submit">Log In</Button>
						<Link className="registerAnchor" to="/signup">
							Don't have an account? <span>Register now!</span>
						</Link>
					</Form>
				</UniqueFormWrapper>
			</Box>
		</Wrapper>
	);
};

export default withRouter(SignIn);
