import { AnimatePresence, motion } from "framer-motion";
import { Route, Switch } from "react-router";
import { useLocation } from "react-router";

export const MountTransition = ({ children, scale = 1 }) => (
	<motion.div
		exit={{ opacity: 0, scale: scale }}
		initial={{ opacity: 0, scale: scale }}
		animate={{ opacity: 1, scale: 1 }}
	>
		{children}
	</motion.div>
);

export const RouteTransition = ({ children, path, scale, ...rest }) => {
	return (
		<Route path={path} {...rest}>
			<MountTransition scale={scale}>{children}</MountTransition>
		</Route>
	);
};
export const AnimatedRoutes = ({ children, exitBeforeEnter = true, initial = false }) => {
	const location = useLocation();

	return (
		<AnimatePresence exitBeforeEnter={exitBeforeEnter} initial={initial}>
			<Switch location={location} key={location.pathname}>
				{children}
			</Switch>
		</AnimatePresence>
	);
};
