import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RouteTransition } from "./AnimatedRoutes";

export default function ProtectedRoute({ component, path, ...rest }) {
	const user = useSelector((state) => state?.user.value);

	return (
		<RouteTransition {...rest} path={path}>
			{user.isLogged ? component : <Redirect to={{ pathname: "/signin" }} />}
		</RouteTransition>
	);
}
