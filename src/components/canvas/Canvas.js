import { useState, useEffect } from "react";
import Board from "./Board";
import styled from "styled-components";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { db, updateBoardItems } from "../../firebase";
import { collection, onSnapshot } from "@firebase/firestore";
import { Task } from "./Task";
import { useSelector } from "react-redux";

const Table = styled.section`
	display: flex;
	width: 100%;
	height: auto;
	flex-wrap: wrap;
`;

function Canvas() {
	const [tasks, setTasks] = useState();
	const [boards, setBoards] = useState();
	const { id: userId } = useSelector((state) => state?.user.value);

	//getting tasks from firestore
	useEffect(() => {
		if (userId === null || userId === "" || userId === undefined) {
			setTasks();
		} else {
			const getTasks = async (userId) => {
				onSnapshot(collection(db, `users/${userId}/tasks`), (snapshot) => {
					setTasks(
						snapshot.docs.map((doc) => {
							return { id: doc.id, ...doc.data() };
						})
					);
				});
			};
			getTasks(userId);
		}
	}, [userId]);

	//getting boards from firestore
	useEffect(() => {
		if (userId === null || userId === "" || userId === undefined) {
			setBoards();
		} else {
			const fetchData = async (userId) => {
				onSnapshot(collection(db, `users/${userId}/boards`), (snapshot) => {
					setBoards(
						snapshot.docs.map((doc) => {
							return { ...doc.data(), id: doc.id };
						})
					);
				});
			};
			fetchData(userId);
		}
	}, [userId]);

	// drag and drop functionality
	const onDragEnd = (result) => {
		const { source, destination, draggableId } = result;
		console.log("From:", source, "To:", destination, "What:", draggableId);

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

			const newUpdatedData = {
				...tasks,
				boards: {
					...tasks.boards,
					[withoutDraggedItem.board_id]: withoutDraggedItem,
					[withDraggedItem.board_id]: withDraggedItem,
				},
			};
			setTasks(newUpdatedData);
		}
	};

	//render
	return (
		<Table>
			<DragDropContext onDragEnd={onDragEnd}>
				{boards?.map((board) => {
					//get all the current tasks and see if theyre on any board
					let taskList = tasks.filter((task) => board.items.includes(task.id));
					let reorderedBoards = []; // sorting the tasks by the index of each individual board.items array

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
							<Board userId={userId} title={board.title} color={board.color} boardId={board.id}>
								<Droppable key={board.id} droppableId={board.board_id}>
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.droppableProps}
											style={{
												backgroundColor: snapshot.isDraggingOver ? "#ebedfa" : "",
												minHeight: "150px",
												margin: 0,
											}}
										>
											{reorderedBoards.map((task, index) => {
												return (
													<Draggable key={task.id} draggableId={task.id} index={index}>
														{(provided, snapshot) => (
															<div
																ref={provided.innerRef}
																{...provided.draggableProps}
																{...provided.dragHandleProps}
															>
																<Task
																	title={task.name}
																	details={task.id}
																	isDragging={snapshot.isDragging}
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
						</div>
					);
				})}
			</DragDropContext>
		</Table>
	);
}

export default Canvas;
