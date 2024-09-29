/* eslint-disable @next/next/no-img-element */
"use client";

import { auth, signOutFunc } from "@/firebase/firebaseauth";
import { db, saveExpense } from "@/firebase/firebasefirestore";
import { CategoryType } from "@/types/types";
import { onAuthStateChanged } from "firebase/auth";
import { collection, DocumentData, onSnapshot, query, Unsubscribe, where } from "firebase/firestore";
import { useEffect, useState } from "react"


export default function Home() {











    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('none');
    const [note, setNote] = useState('');
    const [date] = useState(new Date());
    const [expense, setExpense] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState(true);













    useEffect(() => {
        const detachOnAuthListiner = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchExpensesRealtime();
            }
        });

        return () => {
            if (readTodosRealtime) {
                console.log("Component Unmount.");
                readTodosRealtime();
                detachOnAuthListiner();
            }
        };
    }, []);












    let readTodosRealtime: Unsubscribe;
    const fetchExpensesRealtime = () => {
        const collectionRef = collection(db, "expenses");
        const currentUserUID = auth.currentUser?.uid;
        const condition = where("uid", "==", currentUserUID);
        const q = query(collectionRef, condition);
        const expenseClone = [...expense];

        readTodosRealtime = onSnapshot(q, (querySnapshot) => {
            querySnapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    const todo = change.doc.data();
                    todo.id = change.doc.id;
                    expenseClone.push(todo);
                    setExpense([...expenseClone]);
                }
                if (change.type === "modified") {
                    const todo = change.doc.data();
                    todo.id = change.doc.id;
                    const index = expenseClone.findIndex(t => t.id === todo.id);
                    if (index !== -1) {
                        expenseClone[index] = todo;
                    }
                    setExpense([...expenseClone]);
                    console.log("modified");
                }
                if (change.type === "removed") {
                }
            });
            setLoading(false);
        });
    };











    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        if (amount && title && category !== "none" && note) {
            e.preventDefault();
            saveExpense(title, amount, date, category, note);
            setAmount(0);
            setCategory("none");
            setTitle("");
            setNote("");
        }
        else {
            e.preventDefault();
            console.log("please enter full information");
        }

    }














    return (
        <>
            {auth.currentUser?.photoURL ? <img src={auth.currentUser?.photoURL as string} alt="image" /> : null}
            <h1>Hello {auth.currentUser?.displayName ? auth.currentUser?.displayName : auth.currentUser?.email}</h1>
            <button onClick={signOutFunc}>Signout</button>
            <h1>Add your expense</h1>
            <form onSubmit={handleSubmit}>
                <h4>Title</h4>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => { setTitle(e.target.value); }

                    }
                />
                <h4>Amount</h4>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => { setAmount(Number(e.target.value)); }}

                />
                <h4>Category</h4>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryType)}
                >
                    <option value="None">None</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Bills">Bills</option>
                    <option value="Education">Education</option>
                    <option value="Investments">Investments</option>
                    <option value="Luxuries">Luxuries</option>
                    <option value="Other">Other</option>
                </select>

                <h4>Optional Note</h4>
                <textarea
                    value={note}
                    onChange={(e) => { setNote(e.target.value); }} ></textarea>
                <br />
                <br />
                <button type="submit">Add Expense</button>
            </form>















            {loading ? (
                <div className="loading"></div>
            ) : expense.length > 0 ? (
                expense.map(({ amount, category, date, note, title, id }) => {
                    return (
                        <div key={id}>
                            <p>Title: {title}</p>
                            <p>Amount: &#8383; {amount}</p>
                            <p>Category: {category}</p>
                            <p>Date: {date.toDate().toLocaleDateString(date)}</p>
                            <p>Note: {note}</p>
                        </div>
                    );
                })
            ) : (
                <h4>You have no expenses</h4>
            )}
        </>
    );
}
