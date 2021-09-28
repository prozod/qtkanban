// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	collection,
	doc,
	getDocs,
	getFirestore,
	query
} from "firebase/firestore";
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

export async function getUserTasks(userId) {
	const userTask = collection(db, `users/${userId}/tasks`);
	const userTaskSnapshot = await getDocs(userTask);
	const userTaskList = userTaskSnapshot.docs.map(doc => doc.data());
	return userTaskList;
}

export async function getUsers(db) {
	const usersCol = collection(db, "users");
	const userSnapshot = await getDocs(usersCol);
	const userList = userSnapshot.docs.map(doc => {
		const tasks = [];
		getUserTasks(doc.id).then(task => {
			return tasks.push(...task);
		});
		return { id: doc.id, data: doc.data(), tasks };
	});
	return userList;
}
// const usersCol = collection(db, "users/aExoAbLJaSetm7KNQaaK/tasks");
