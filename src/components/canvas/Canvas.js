import { useState } from "react";
import Board from "./Board";
import styled from "styled-components";
import { items, boardOrder } from "../../tasks";
import { Task } from "./Task";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Table = styled.section`
	display: flex;
	width: 100%;
	height: auto;
	flex-wrap: wrap;
`;

function Canvas() {
	const [data, setData] = useState(items);

	const onDragEnd = result => {
		const { source, destination, draggableId } = result;

		if (!destination) return;
		if (
			source.index === destination.index &&
			source.droppableId === destination.droppableId
		)
			return;

		//pull the items out from each board array
		const start = data.boards[source.droppableId];
		const end = data.boards[destination.droppableId];

		//if the column where we drag is the same is the same
		if (start === end) {
			const newItems = Array.from(start.items);
			newItems.splice(source.index, 1);
			newItems.splice(destination.index, 0, draggableId);

			const newBoard = {
				...start,
				items: newItems
			};

			const updatedData = {
				...data,
				boards: {
					...data.boards,
					[newBoard.board_id]: newBoard
				}
			};
			console.log(updatedData);
			setData(updatedData);
		}

		//////if the column where we drag is different
		if (start !== end) {
			const startItems = Array.from(start.items);
			startItems.splice(source.index, 1);
			const withoutDraggedItem = {
				...start,
				items: startItems
			};

			const endItems = Array.from(end.items);
			endItems.splice(destination.index, 0, draggableId);
			const withDraggedItem = {
				...end,
				items: endItems
			};

			const newUpdatedData = {
				...data,
				boards: {
					...data.boards,
					[withoutDraggedItem.board_id]: withoutDraggedItem,
					[withDraggedItem.board_id]: withDraggedItem
				}
			};
			setData(newUpdatedData);
		}
	};

	return (
		<Table>
			<DragDropContext onDragEnd={onDragEnd}>
				{boardOrder.map(colId => {
					const boards = data.boards[colId];
					const tasks = boards.items.map(i => data.tasks[i]);
					return (
						<Board
							key={colId}
							dotColor={boards.color}
							boardname={boards.title}
							id={colId}
						>
							<Droppable key={boards.title} droppableId={boards.board_id}>
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										{...provided.droppableProps}
										style={{
											backgroundColor: snapshot.isDraggingOver ? "#ebedfa" : "",
											minHeight: "150px",
											margin: 0
										}}
									>
										{tasks.map((t, index) => {
											return (
												<Draggable key={t.id} draggableId={t.id} index={index}>
													{(provided, snapshot) => (
														<div
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
														>
															<Task
																title={t.task}
																description={t.description}
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
					);
				})}
			</DragDropContext>
		</Table>
	);
}

export default Canvas;
