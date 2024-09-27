import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { app } from "./firebaseconfig";
import { auth } from "./firebaseauth";

export const db = getFirestore(app);

type UserType = {
  email: string;
  rollNum: string;
  studentName: string;
  uid: string;
};

export async function saveUser(user: UserType) {
  //   const docRef = doc(db, "collectionName", "docID");
  //   await setDoc(docRef, user);

  //   const collectionRef = collection(db, "collectionName");
  //   await addDoc(collectionRef, user);

  try {
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, user);
  } catch (e) {
    console.log(e);
  }
}

export async function saveTodo(todo: string) {
  // collection(db, "collectionName")
  // addDoc("where", "what");

  const uid = auth.currentUser?.uid;
  const newTodo = { todo, uid };

  try {
    const collectionRef = collection(db, "todos");
    await addDoc(collectionRef, newTodo);
  } catch (error) {
    console.log(error);
  }
}

export async function fetchTodos() {
  // const docRef = doc(db, "collectionName", "docID");
  // await getDoc(docRef);

  // const collectionRef = collection(db, "collectionName");
  // query(where, condition)
  // await getDocs(collectionRef);

  const collectionRef = collection(db, "todos");
  const currentUserUID = auth.currentUser?.uid;

  const condition = where("uid", "==", currentUserUID);
  const q = query(collectionRef, condition);

  const allTodosSnapshot = await getDocs(q);

  const allTodos = allTodosSnapshot.docs.map((todoSnapshot) => {
    const todo = todoSnapshot.data();
    todo.id = todoSnapshot.id;
    return todo
  })
  return allTodos;




  // allTodosSnapshot.forEach((todo) => {
  //   const todoData = todo.data();
  //   todoData.id = todo.id;
  //   console.log(todoData);
  // });



}
