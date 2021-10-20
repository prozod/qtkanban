import { app, createNewUserDocument } from "./firebase";
import { signInWithPopup, getAdditionalUserInfo, signOut } from "firebase/auth";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);

// log in or create account
export function logIn() {
	signInWithPopup(auth, provider)
		.then((res) => {
			const user = res.user;
			if (getAdditionalUserInfo(res).isNewUser) {
				createNewUserDocument(user);
				console.log(`New user created with document UID: ${user.uid}`);
			} else {
				console.log(
					"Unable to create new document. User already exists and might already have a document."
				);
			}
			console.log("errytiem");
		})
		.catch((error) => {
			console.error(error.message);
		});
}

// log out
export function logOut() {
	signOut(auth)
		.then(() => {
			console.log("Signed out successfully.");
		})
		.catch((error) => {
			console.error(error.message);
		});
}
