import { useState, useEffect } from "react";
import Board from "./Board";
import styled from "styled-components";
import { items } from "../../tasks";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { db } from "../../firebase";
import { collection, doc, getDocs, onSnapshot } from "@firebase/firestore";
import { Task } from "./Task";
const Table = styled.section`
	display: flex;
	width: 100%;
	height: auto;
	flex-wrap: wrap;
`;

function Canvas({ userId }) {
	const [data, setData] = useState(items);
	const [boards, setBoards] = useState();

	const destructuredUserId = userId?.map(user => user.id);

	useEffect(() => {
		const fetchData = async userId => {
			onSnapshot(collection(db, `users/${userId}/boards`), snapshot => {
				setBoards(
					snapshot.docs.map(doc => {
						return { ...doc.data(), id: doc.id };
					})
				);
			});
		};
		fetchData(userId?.map(user => user.id));
	}, [userId]);
	console.log(boards);
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
			{boards?.map(board => {
				return (
					<div key={board.id}>
						<Board
							userId={userId?.map(user => user.id)}
							title={board.title}
							color={board.color}
							boardId={board.id}
						>
							{board?.items.map(item => {
								return <Task title={item.title} />;
							})}
						</Board>
					</div>
				);
			})}
		</Table>
	);
}

export default Canvas;
