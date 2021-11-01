import { withRouter } from "react-router";
import Profile from "../components/userprofile/Profile";
import Sidebar from "../components/sidebar/Sidebar";

function Account({ logout }) {
	return (
		<>
			<Sidebar logout={logout} />
			<Profile logout={logout} />
		</>
	);
}

export default withRouter(Account);
