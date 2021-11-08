import { withRouter } from "react-router";
import Profile from "../components/userprofile/Profile";

function Account({ logout }) {
	return <Profile logout={logout} />;
}

export default withRouter(Account);
