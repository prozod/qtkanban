import "./App.css";
import { useEffect } from "react";
import { auth, logOut, logIn } from "./firebaseAuth";
import { useDispatch } from "react-redux";
import LogIn from "./components/account/LogIn";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import { loginStatus } from "./features/userSlice";
import { onAuthStateChanged } from "firebase/auth";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(
					loginStatus({
						id: user.uid,
						email: user.email,
						username: user.displayName,
						photo_url: user.photoURL,
						isLogged: true,
					})
				);
			} else {
				dispatch(
					loginStatus({
						id: "",
						email: "",
						username: "",
						photo_url: "",
						isLogged: false,
					})
				);
			}
		});
	}, [dispatch]);

	return (
		<Router>
			<div className="App">
				<Switch>
					<Route exact path="/">
						{<LogIn isLogged={auth.currentUser} action={logIn} />}
					</Route>

					<Route exact path="/boards">
						<Dashboard isLogged={auth.currentUser} action={logOut} />
					</Route>

					<Route exact path="/account">
						<Account action={logOut} isLogged={auth.currentUser} />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
