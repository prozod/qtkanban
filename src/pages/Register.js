import { useState } from "react";
import { Form, Input, Label } from "../components/utilities/Form";
import { Wrapper, Box, Header, Divider, UniqueFormWrapper } from "./styles/AccountCreation.styles";
import qtlogo from "../images/qt.png";
import Button from "../components/button/Button";
import { IoArrowForwardSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { useHistory, withRouter } from "react-router";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, createNewUserDocumentWithEmail } from "../firebase";

function Register({ isLogged, isLoading }) {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [profilePicture, setProfilePicture] = useState("");
	const [equalPasswords, setEqualPasswords] = useState(false);

	let history = useHistory();

	function resetFields() {
		setEmail("");
		setUsername("");
		setPassword("");
		setConfirmPassword("");
		setEqualPasswords(false);
		setProfilePicture("");
	}

	function createAccWithUserAndPassword(e) {
		e.preventDefault();

		if (password !== "" && confirmPassword !== "" && confirmPassword === password) {
			setEqualPasswords(true);

			createUserWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user;

					updateProfile(user, {
						displayName: username,
						photoURL: profilePicture,
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

					createNewUserDocumentWithEmail(user, username, profilePicture);
					console.log("USER DETAILS:", user);
					toast.success(`We're glad to have you, ${username}!`);
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
							value={email}
							type="text"
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Label id="username" text="Username" />
						<Input
							required
							placeholder="What do your friends call you?"
							value={username}
							type="text"
							onChange={(e) => setUsername(e.target.value)}
						/>
						<Label id="password" text="Password" />
						<Input
							required
							placeholder="Minimum 6 characters"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Label id="confirmPassword" text="Password confirmation" />
						<Input
							required
							placeholder="Re-type the password you entered above"
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<Label id="profilePicture" text="Profile picture URL" />
						<Input
							placeholder="This field is optional"
							value={profilePicture}
							type="text"
							onChange={(e) => setProfilePicture(e.target.value)}
						/>
						<Button>
							Create account
							<span>
								<IoArrowForwardSharp />
							</span>
						</Button>
					</Form>
					<Link className="registerAnchor" to="/">
						<span>Go back</span>
					</Link>
				</UniqueFormWrapper>
			</Box>
		</Wrapper>
	);
}

export default withRouter(Register);
