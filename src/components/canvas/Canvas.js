import { useEffect } from "react";
import styled from "styled-components";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// components + styles + animations
import EditPanel from "./task/EditPanel";
import Board from "./board/Board";
import { Task } from "./task/Task";
import { motion, AnimatePresence } from "framer-motion";
import { editPanelVariants } from "../../utilities/Variants";

// state + firebase
import { db, updateBoardItems } from "../../firebase";
import { collection, onSnapshot } from "@firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { updateBoards, updateTasks } from "../../features/userSlice";

const Table = styled.section`
	display: flex;
	flex-wrap: wrap;
	padding: 0 10em;
	margin: 0;

	@media (max-width: 768px) {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 50%;
		margin: 0 auto;
		padding: 0;
		padding-bottom: 5em;
	}

	@media (max-width: 550px) {
		width: 100%;
	}
`;

function Canvas() {
	const dispatch = useDispatch();
	const { id: userId } = useSelector((state) => state?.user.value);
	const dragDisabled = useSelector((state) => state?.disableDrag.isDisabled);
	const editMenuState = useSelector((state) => state.editMenu.isActive);
	const menuTaskId = useSelector((state) => state.editMenu.taskId);
	const tasks = useSelector((state) => state.user.tasks);
	const boards = useSelector((state) => state.user.boards);

	//getting tasks from firestore
	useEffect(() => {
		if (userId === null || userId === "" || userId === undefined) {
			return null;
		} else {
			const getTasks = async (userId) => {
				onSnapshot(collection(db, `users/${userId}/tasks`), (snapshot) => {
					dispatch(
						updateTasks(
							snapshot.docs.map((doc) => {
								return {
									...doc.data(),
									id: doc.id,
								};
							})
						)
					);
				});
			};
			getTasks(userId);
		}
	}, [userId, dispatch]);

	//getting boards from firestore
	useEffect(() => {
		if (userId === null || userId === "" || userId === undefined) {
			return null;
		} else {
			const fetchData = async (userId) => {
				onSnapshot(collection(db, `users/${userId}/boards`), (snapshot) => {
					dispatch(
						updateBoards(
							snapshot.docs.map((doc) => {
								return { ...doc.data(), id: doc.id };
							})
						)
					);
				});
			};
			fetchData(userId);
		}
	}, [userId, dispatch]);

	// drag and drop functionality
	const onDragEnd = (result) => {
		const { source, destination, draggableId } = result;
		// console.log("From:", source, "To:", destination, "What:", draggableId);

		if (!destination) return;
		if (source.index === destination.index && source.droppableId === destination.droppableId)
			return;

		//pull the items out from each board array

		const start = boards?.find((board) => board.board_id === source.droppableId);
		const end = boards?.find((board) => board.board_id === destination.droppableId);

		//if the column where we drag is the same is the same
		if (start.board_id === end.board_id) {
			const newItems = Array.from(start.items);

			newItems.splice(source.index, 1);
			newItems.splice(destination.index, 0, draggableId);

			const newBoard = {
				...start,
				items: newItems,
			};

			updateBoardItems(userId, start.id, newBoard);
		}

		//////if the column where we drag is different
		if (start !== end) {
			const startItems = Array.from(start.items);
			startItems.splice(source.index, 1);
			const withoutDraggedItem = {
				...start,
				items: startItems,
			};

			const endItems = Array.from(end.items);
			endItems.splice(destination.index, 0, draggableId);
			const withDraggedItem = {
				...end,
				items: endItems,
			};

			updateBoardItems(userId, start.id, withoutDraggedItem);
			updateBoardItems(userId, end.id, withDraggedItem);
			// setTasks(newUpdatedData);
		}
	};

	//render
	return (
		<Table>
			<DragDropContext onDragEnd={onDragEnd}>
				{boards?.map((board, i) => {
					//get all the current tasks and see if theyre on any board
					let taskList = tasks?.filter((task) => board.items.includes(task.id));

					// sorting the tasks by the index of each individual board.items array
					let reorderedBoards = [];
					board.items.forEach((key) => {
						let found = false;
						taskList = taskList.filter((item) => {
							if (!found && item.id === key) {
								reorderedBoards.push(item);
								found = true;
								return false;
							} else {
								return true;
							}
						});
					});

					return (
						<div key={board.id}>
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{
									duration: 0.2,
									delay: i * 0.2,
								}}
							>
								<Board
									userId={userId}
									title={board.title}
									color={board.color}
									boardId={board.id}
									boardItems={board.items}
								>
									<Droppable key={board.id} droppableId={board.board_id}>
										{(provided, snapshot) => (
											<div
												ref={provided.innerRef}
												{...provided.droppableProps}
												style={{
													backgroundColor: snapshot.isDraggingOver ? "#ebedfa" : "",
													minHeight: "100px",
													margin: 0,
													borderRadius: "10px",
												}}
											>
												{reorderedBoards.map((task, index) => {
													// console.log(new Date(task?.due_to).toDate());
													return (
														<Draggable
															key={task.id}
															draggableId={task.id}
															index={index}
															isDragDisabled={dragDisabled ? true : false}
														>
															{(provided, snapshot) => (
																<div
																	ref={provided.innerRef}
																	{...provided.draggableProps}
																	{...provided.dragHandleProps}
																>
																	<Task
																		title={task.name}
																		priority={task?.priority}
																		isDragging={snapshot.isDragging}
																		taskId={task.id}
																		dueto={task?.due_to?.toDate().toDateString()}
																		boardId={board.id}
																	/>
																</div>
															)}
														</Draggable>
													);
												})}
												{provided.placeholder}
											</div>
										)}
									</Droppable>
								</Board>
							</motion.div>
						</div>
					);
				})}
			</DragDropContext>

			<AnimatePresence>
				{editMenuState && (
					<motion.div
						variants={editPanelVariants}
						initial="initial"
						animate={editMenuState ? "animate" : "initial"}
						exit="exit"
					>
						<EditPanel task={tasks?.find((t) => t.id === menuTaskId)} />
					</motion.div>
				)}
			</AnimatePresence>
		</Table>
	);
}

export default Canvas;
