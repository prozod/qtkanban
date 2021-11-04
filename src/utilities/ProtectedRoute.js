import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ component, ...rest }) {
	const user = useSelector((state) => state?.user.value);

	return (
		<>
			<Route
				{...rest}
				render={(props) => {
					if (user.isLogged) {
						return component;
					} else {
						return <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />;
					}
				}}
			/>
		</>
	);
}
