// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBwDK-vqjpXDtWRZUURGlCLxuvorfqWyXU",
	authDomain: "qtkanban.firebaseapp.com",
	projectId: "qtkanban",
	storageBucket: "qtkanban.appspot.com",
	messagingSenderId: "325098087761",
	appId: "1:325098087761:web:deec62c3656df1cfb41f70",
	measurementId: "G-K81Q848GHN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const analytics = getAnalytics(app);

export const updateUserBoard = async (userId, boardId, updatedDocument) => {
	const boardRef = doc(db, "users", `${userId}`, "boards", `${boardId}`);
	await updateDoc(boardRef, updatedDocument);
};
//Queries
// async function getUserTasks(userId) {
// 	const userTask = collection(db, `users/${userId}/tasks`);
// 	const userTaskSnapshot = await getDocs(userTask);
// 	const userTaskList = userTaskSnapshot.docs.map(doc => {
// 		return { id: doc.id, data: doc.data() };
// 	});
// 	return userTaskList;
// }

// async function getUserBoards(userId) {
// 	const userBoard = collection(db, `users/${userId}/boards`);
// 	const userBoardSnapshot = await getDocs(userBoard);
// 	const userBoardList = userBoardSnapshot.docs.map(doc => doc.data());
// 	return userBoardList;
// }

// export async function getUsers(db) {
// 	const usersCol = collection(db, "users");
// 	const userSnapshot = await getDocs(usersCol);

// 	const userList = userSnapshot.docs.map(doc => {
// 		const tasks = [];
// 		getUserTasks(doc.id).then(task => {
// 			return tasks.push(task);
// 		});

// 		const boards = [];
// 		getUserBoards(doc.id).then(board => {
// 			return boards.push(board);
// 		});

// 		return { id: doc.id, data: doc.data(), tasks, boards };
// 	});
// 	return userList;
// }
