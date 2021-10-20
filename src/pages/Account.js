import { withRouter } from "react-router";
import Profile from "../components/account/Profile";
import Sidebar from "../components/sidebar/Sidebar";
import { useHistory } from "react-router";

function Account({ action, isLogged }) {
	let history = useHistory();
	if (!isLogged) history.push("/");

	return (
		<>
			<Sidebar logout={action} isLogged={isLogged} />
			<Profile logout={action} />
		</>
	);
}

export default withRouter(Account);
