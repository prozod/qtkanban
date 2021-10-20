import { initializeApp } from "firebase/app";
import {
	doc,
	getFirestore,
	updateDoc,
	setDoc,
	addDoc,
	collection,
	arrayUnion,
	serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBwDK-vqjpXDtWRZUURGlCLxuvorfqWyXU",
	authDomain: "qtkanban.firebaseapp.com",
	projectId: "qtkanban",
	storageBucket: "qtkanban.appspot.com",
	messagingSenderId: "325098087761",
	appId: "1:325098087761:web:deec62c3656df1cfb41f70",
	measurementId: "G-K81Q848GHN",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();

// POST a new task to Cloud Firestore
export const createNewTask = async (userId, boardId, updatedDocument) => {
	const taskRef = collection(db, "users", `${userId}`, "tasks");
	const newDoc = await addDoc(taskRef, updatedDocument);

	const boardRef = doc(db, "users", `${userId}`, "boards", `${boardId}`);
	await updateDoc(boardRef, { items: arrayUnion(newDoc.id) });
	console.log(newDoc.id);
};

// PUT/UPDATE board data
export const updateBoardItems = async (userId, boardId, updatedDocument) => {
	const boardRef = doc(db, "users", `${userId}`, "boards", `${boardId}`);
	await updateDoc(boardRef, updatedDocument);
};

// Create a new document for each user when they sign up/register for the first time.
export const createNewUserDocument = async (user) => {
	await setDoc(doc(db, "users", user.uid), {
		userName: user.displayName,
		photoURL: user.photoURL,
		registeredOn: serverTimestamp(),
	});
};
