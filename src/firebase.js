import { initializeApp } from "firebase/app";
import {
	doc,
	getFirestore,
	updateDoc,
	setDoc,
	addDoc,
	getDoc,
	collection,
	arrayUnion,
	serverTimestamp,
	deleteDoc,
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "@firebase/auth";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGE_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);

// POST a new task to Cloud Firestore
export const createNewTask = async (userId, boardId, updatedDocument) => {
	const taskRef = collection(db, "users", `${userId}`, "tasks");
	const newDoc = await addDoc(taskRef, updatedDocument);

	const boardRef = doc(db, "users", `${userId}`, "boards", `${boardId}`);
	await updateDoc(boardRef, { id: boardId, items: arrayUnion(newDoc.id) });
	console.log(newDoc.id);
};

// POST a new board to Cloud Firestore
export const createNewBoard = async (userId, newDocument) => {
	const boardsRef = collection(db, "users", `${userId}`, "boards");
	await addDoc(boardsRef, newDocument);
};

// PUT/UPDATE board data
export const updateBoardItems = async (userId, boardId, updatedDocument) => {
	const boardRef = doc(db, "users", `${userId}`, "boards", `${boardId}`);
	await updateDoc(boardRef, updatedDocument);
};

// Create a new document for each user when they sign up/register for the first time with Google.
export const createNewUserDocumentWithGoogle = async (user) => {
	await setDoc(doc(db, "users", user.uid), {
		userName: user.displayName,
		photoURL: user.photoURL,
		registeredOn: serverTimestamp(),
	});
};

// Create a new document for each user when they sign up/register for the first time with Email.
export const createNewUserDocumentWithEmail = async (userDocument, username, photoUrl = "") => {
	await setDoc(doc(db, "users", userDocument.uid), {
		userName: username,
		photoURL: photoUrl,
		registeredOn: serverTimestamp(),
	});
};

//DELETE TASK
export const deleteTask = async (userId, taskId) => {
	await deleteDoc(doc(db, "users", `${userId}`, "tasks", `${taskId}`));
};
