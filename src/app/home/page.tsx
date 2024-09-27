"use client";

import { auth } from "@/firebase/firebaseauth";
import { db, saveTodo } from "@/firebase/firebasefirestore";
import { onAuthStateChanged } from "firebase/auth";
import { collection, DocumentData, onSnapshot, query, Unsubscribe, where } from "firebase/firestore";
import { useEffect, useState } from "react"

export default function Home() {
    const [todo, setTodo] = useState('');
    const [allTodos, setAllTodos] = useState<DocumentData[]>([]);

    useEffect(() => {
        const detachOnAuthListiner = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchTodosRealtime();
            }
        })

        return () => {
            if (readTodosRealtime) {
                console.log("Component Unmount.");
                readTodosRealtime();
                detachOnAuthListiner();
            }
        }

    }, [])

    let readTodosRealtime: Unsubscribe;

    const fetchTodosRealtime = () => {
        const collectionRef = collection(db, "todos");
        const currentUserUID = auth.currentUser?.uid;
        const condition = where("uid", "==", currentUserUID);
        const q = query(collectionRef, condition);
        const allTodosClone = [...allTodos];

        readTodosRealtime = onSnapshot(q, (querySnapshot) => {
            querySnapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    const todo = change.doc.data();
                    todo.id = change.doc.id;
                    allTodosClone.push(todo);
                    setAllTodos([...allTodosClone])
                }
                if (change.type === "modified") {
                    const todo = change.doc.data();
                    todo.id = change.doc.id;
                    const index = allTodosClone.findIndex(t => t.id === todo.id);
                    if (index !== -1) {
                        allTodosClone[index] = todo;
                    }
                    setAllTodos([...allTodosClone]);
                    console.log("modified");
                }
                if (change.type === "removed") {
                }
            })
        })
    }

    return (
        <>
            <h1>Hello Home</h1>
            <input type="text"
                value={todo}
                onChange={(e) => { setTodo(e.target.value) }}
            />
            <button onClick={() => {
                saveTodo(todo);
                setTodo('');
            }}>Add New Todo</button>

            {
                allTodos.length > 0 ?
                    allTodos.map(({ todo }, index) => <h1 key={index}>{todo}</h1>) :
                    <h1>your all todos will be listed here</h1>
            }

        </>
    )
}