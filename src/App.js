//styling, pages and components
import "./App.css";
import LogIn from "./pages/LogIn";
import Dashboard from "./pages/Dashboard";
import UserAccount from "./pages/Account";
import Register from "./pages/Register";

//state
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginStatus } from "./features/userSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

//router
import ProtectedRoute from "./components/utilities/ProtectedRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//toast notification popup
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	// log out
	function logOut() {
		signOut(auth)
			.then(() => {
				toast.info("You've been logged out.");
			})
			.catch((error) => {
				toast.error("Wooops! An error occured. Try again.");
				console.error(error.message);
			});
	}

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
			setIsLoading(false);
		});
	}, [dispatch]);

	return (
		<Router>
			<div className="App">
				<Switch>
					<Route exact path="/">
						{<LogIn isLogged={auth.currentUser} isLoading={isLoading} />}
					</Route>

					<Route exact path="/register">
						{<Register isLogged={auth.currentUser} isLoading={isLoading} />}
					</Route>

					<ProtectedRoute
						exact
						path="/boards"
						component={<Dashboard logout={logOut} />}
						isLoading={isLoading}
					/>
					<ProtectedRoute
						exact
						path="/account"
						component={<UserAccount logout={logOut} />}
						isLoading={isLoading}
					/>
				</Switch>
				<ToastContainer
					position="bottom-right"
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
			</div>
		</Router>
	);
}

export default App;
