import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";

export default function ProtectedRoute({ component, isLoading, ...rest }) {
	const user = useSelector((state) => state?.user.value);

	return (
		<>
			<Route
				{...rest}
				render={(props) => {
					if (isLoading) {
						<Spinner />;
					} else if (user.isLogged) {
						return component;
					} else {
						return <Redirect to={{ pathname: "/", state: { from: props.location } }} />;
					}
				}}
			/>
		</>
	);
}
