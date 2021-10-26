import { withRouter } from "react-router";
import Profile from "../components/account/Profile";
import Sidebar from "../components/sidebar/Sidebar";

function UserAccount({ logout }) {
	return (
		<>
			<Sidebar logout={logout} />
			<Profile logout={logout} />
		</>
	);
}

export default withRouter(UserAccount);
