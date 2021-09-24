export const items = {
	tasks: {
		"task-1": {
			id: "task-1",
			task: "Get kids from school",
			description: "Hey ho Santa Claus",
			status: "backlog"
		},
		"task-2": {
			id: "task-2",
			task: "Get beer",
			description: "Hey ho Santa Claus",
			status: "backlog"
		},
		"task-3": {
			id: "task-3",
			task: "Complete SEO Course",
			description: "Hey ho Santa Claus",
			status: "todo"
		},
		"task-4": {
			id: "task-4",
			task: "Feed the dragons",
			description: "Hey ho Santa Claus",
			status: "done"
		},
		"task-5": {
			id: "task-5",
			task: "Make breakfast at 11",
			description: "Hey ho Santa Claus",
			status: "done"
		}
	},
	boards: {
		backlog: {
			id: 1,
			board_id: "backlog",
			title: "Backlog",
			color: "#ff4167 ",
			items: ["task-1", "task-2", "task-3", "task-4", "task-5"]
		},
		todo: {
			id: 2,
			board_id: "todo",
			title: "Todo",
			color: "#4b37e6",
			items: []
		},
		inprogress: {
			id: 3,
			board_id: "inprogress",
			title: "In Progress",
			color: "#40e637",
			items: []
		},
		review: {
			id: 4,
			board_id: "review",
			title: "Review",
			color: "#375de6",
			items: []
		},
		done: {
			id: 5,
			board_id: "done",
			title: "Done",
			color: "#f5da0c",
			items: []
		}
	}
};

export const boardOrder = Object.keys(items.boards);
