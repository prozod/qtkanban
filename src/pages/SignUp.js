import { useState } from "react";
import { Form, Input, Label } from "../utilities/Form";
import { Wrapper, Box, Header, Divider, UniqueFormWrapper } from "./styles/Account.styles";
import qtlogo from "../images/qt.png";
import Button from "../components/button/Button";
import { IoArrowForwardSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useHistory, withRouter } from "react-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, createNewUserDocumentWithEmail } from "../firebase";

function SignUp({ isLogged, isLoading }) {
	const [user, setUser] = useState({
		email: "",
		username: "",
		password: "",
		confirmPassword: "",
		profilePicture: "",
	});

	let history = useHistory();

	if (auth.currentUser !== null) history.push("/boards");

	function resetFields() {
		setUser({
			email: "",
			username: "",
			password: "",
			confirmPassword: "",
			profilePicture: "",
		});
	}

	function createAccWithUserAndPassword(e) {
		e.preventDefault();

		if (
			user.password !== "" &&
			user.confirmPassword !== "" &&
			user.confirmPassword === user.password
		) {
			createUserWithEmailAndPassword(auth, user.email, user.password)
				.then((userCredential) => {
					// Signed in
					const userDoc = userCredential.user;

					updateProfile(userDoc, {
						displayName: user?.username,
						photoURL: user?.profilePicture,
					})
						.then(() => {
							console.log("Profile created & updated");
						})
						.catch((error) => {
							console.log(
								"An error occured when updating & creating the user profile.",
								error.message
							);
						});

					createNewUserDocumentWithEmail(userDoc, user?.username, user?.profilePicture);
					console.log("USER DETAILS:", userDoc);
					toast.success(`We're glad to have you, ${user?.username}!`);
					resetFields();
					history.push("/boards");
				})
				.catch((error) => {
					if (error.code === "auth/invalid-email") {
						toast.error("Invalid email address!");
					} else if (error.code === "auth/weak-password") {
						toast.error("Password should be at least 6 characters!");
					} else {
						console.log("Error Code:", error.code, "Error Message:", error.message);
					}
				});
		} else {
			toast.error("Passwords are invalid");
		}
	}
	console.log(user);
	return (
		<Wrapper>
			<Box>
				<Header>
					<img src={qtlogo} alt="quicktools-boards" />
					<h1>Quicktools Boards</h1>
				</Header>

				<h1 className="NewAccount">Create a new account</h1>
				<Divider />
				<UniqueFormWrapper>
					<Form onSubmit={createAccWithUserAndPassword}>
						<Label id="email" text="Email address" />
						<Input
							required
							placeholder="Example: address@email.com"
							value={user.email}
							type="text"
							onChange={(e) => setUser({ ...user, email: e.target.value })}
						/>
						<Label id="username" text="Username" />
						<Input
							required
							placeholder="What do your friends call you?"
							value={user.username}
							type="text"
							onChange={(e) => setUser({ ...user, username: e.target.value })}
						/>
						<Label id="password" text="Password" />
						<Input
							required
							placeholder="Minimum 6 characters"
							type="password"
							value={user.password}
							onChange={(e) => setUser({ ...user, password: e.target.value })}
						/>
						<Label id="confirmPassword" text="Password confirmation" />
						<Input
							required
							placeholder="Re-type the password you entered above"
							type="password"
							value={user.confirmPassword}
							onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
						/>
						<Label id="profilePicture" text="Profile picture URL" />
						<Input
							placeholder="This field is optional"
							value={user.profilePicture}
							type="text"
							onChange={(e) => setUser({ ...user, profilePicture: e.target.value })}
						/>
						<Button>
							Create account
							<span>
								<IoArrowForwardSharp />
							</span>
						</Button>
					</Form>
					<Link className="registerAnchor" to="/signin">
						<span>Go back</span>
					</Link>
				</UniqueFormWrapper>
			</Box>
		</Wrapper>
	);
}

export default withRouter(SignUp);
