export const createTaskVariant = {
	initial: {
		y: "5vw",
		opacity: 0,
	},
	animate: {
		y: "0vw",
		opacity: 1,
		transition: {
			type: "tween",
			duration: 0.25,
			when: "beforeChildren",
			staggerChildren: 0.3,
		},
	},
	exit: {
		opacity: 0,
		y: "5vw",
		transition: {
			type: "tween",
			duration: 0.25,
			when: "afterChildren",
		},
	},
};

export const editPanelVariants = {
	initial: {
		position: "fixed",
		opacity: 0,
		top: 0,
		right: 0,
		x: "100vw",
		width: "35vw",
	},
	animate: {
		position: "fixed",
		x: "0vw",
		opacity: 1,
		transition: {
			type: "tween",
			duration: 0.5,
		},
	},
	exit: {
		opacity: 0,
		x: "100vw",
		transition: {
			type: "tween",
			duration: 0.5,
		},
	},
};
