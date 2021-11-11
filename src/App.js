//styling, pages and components
import React, { useEffect, useState, Suspense } from "react";
import GlobalStyle from "./globalStyles";
import { HOME, SIGN_UP, SIGN_IN, ACCOUNT, BOARDS } from "./constants/routes";

//state
import { useDispatch, useSelector } from "react-redux";
import { loginStatus } from "./features/userSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

//router (v5)
import ProtectedRoute from "./utilities/ProtectedRoute";
import { BrowserRouter as Router, Route } from "react-router-dom";

//toast notification popup
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./utilities/Spinner";
import { AnimatedRoutes, RouteTransition } from "./utilities/AnimatedRoutes";
import Sidebar from "./components/sidebar/Sidebar";
import MobileSidebar from "./components/sidebar/MobileSidebar";

// lazy
const SignIn = React.lazy(() => import("./pages/SignIn"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Account = React.lazy(() => import("./pages/Account"));
const Error = React.lazy(() => import("./pages/Error"));

function App() {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const { isLogged } = useSelector((state) => state?.user.value);

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

	//onAuthStateChange, dispatch empty user state.
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
			<GlobalStyle />
			<div className="App">
				{isLogged && <Sidebar logout={logOut} />}
				{isLogged && <MobileSidebar logout={logOut} />}

				<Suspense fallback={<Spinner />}>
					<AnimatedRoutes exitBeforeEnter initial={false}>
						<RouteTransition exact path={SIGN_IN}>
							<SignIn isLogged={auth.currentUser} />
						</RouteTransition>

						<RouteTransition exact path={SIGN_UP}>
							<SignUp isLogged={auth.currentUser} />
						</RouteTransition>

						{isLoading ? (
							<Spinner />
						) : (
							<ProtectedRoute exact path={HOME} component={<Dashboard logout={logOut} />} />
						)}

						{isLoading ? (
							<Spinner />
						) : (
							<ProtectedRoute exact path={BOARDS} component={<Dashboard />} />
						)}

						{isLoading ? (
							<Spinner />
						) : (
							<ProtectedRoute exact path={ACCOUNT} component={<Account logout={logOut} />} />
						)}

						<Route component={Error} />
					</AnimatedRoutes>
				</Suspense>
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
