"use client";

import { auth } from "@/firebase/firebaseauth";
import { db, deleteExpense, saveExpense } from "@/firebase/firebasefirestore";
import { CategoryType } from "@/types/types";
import { onAuthStateChanged } from "firebase/auth";
import { collection, DocumentData, onSnapshot, query, Unsubscribe, where } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";


function Add() {

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('None');
    const [note, setNote] = useState('');
    const [date] = useState(new Date());
    const [expense, setExpense] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState(true)




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
                const todo = change.doc.data();
                todo.id = change.doc.id;
                if (change.type === "added") {
                    expenseClone.push(todo);
                    setExpense([...expenseClone]);
                }
                if (change.type === "modified") {
                    const index = expenseClone.findIndex(t => t.id === todo.id);
                    if (index !== -1) {
                        expenseClone[index] = todo;
                    }
                    setExpense([...expenseClone]);
                    console.log("modified");
                }
                if (change.type === "removed") {
                    console.log("removed", change);

                    const index = expenseClone.findIndex(t => t.id === todo.id);
                    if (index !== -1) {
                        expenseClone.splice(index, 1);
                        setExpense([...expenseClone]);
                    }
                }
            });
            setLoading(false)
        });
    };


    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        if (amount && title && category !== "None" && note) {
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
        <br /><br /> 
            <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
                <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Add your expense</h1>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "15px" }}>
                        <h4 style={{ marginBottom: "5px" }}>Title</h4>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => { setTitle(e.target.value); }}
                            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <h4 style={{ marginBottom: "5px" }}>Amount</h4>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => { setAmount(Number(e.target.value)); }}
                            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <h4 style={{ marginBottom: "5px" }}>Category</h4>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as CategoryType)}
                            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                            required
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
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <h4 style={{ marginBottom: "5px" }}>Optional Note</h4>
                        <textarea
                            value={note}
                            onChange={(e) => { setNote(e.target.value); }}
                            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", minHeight: "80px" }}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "10px",
                            backgroundColor: "#4CAF50",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "16px"
                        }}
                    >
                        Add Expense
                    </button>
                </form>
            </div>

            <br /><br />

            <div style={{ maxWidth: "800px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
                {loading ? (
                    <div className="loading"></div>
                ) : expense.length > 0 ? (
                    <ul style={{ listStyleType: "none", padding: "0" }}>
                        {expense.map(({ amount, category, date, note, title, id, firebaseID }) => {
                            return (
                                <li key={id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #ccc" }}>
                                    <div style={{ flex: "2", padding: "0 10px" }}>
                                        <strong>Title:</strong> {title}
                                    </div>
                                    <div style={{ flex: "1", padding: "0 10px", textAlign: "center" }}>
                                        <strong>Amount:</strong> &#8383; {amount}
                                    </div>
                                    <div style={{ flex: "1", padding: "0 10px", textAlign: "center" }}>
                                        <strong>Category:</strong> {category}
                                    </div>
                                    <div style={{ flex: "1", padding: "0 10px", textAlign: "center" }}>
                                        <strong>Date:</strong> {date.toDate().toLocaleDateString()}
                                    </div>
                                    <div style={{ flex: "2", padding: "0 10px" }}>
                                        <strong>Note:</strong> {note || "N/A"}
                                    </div>
                                    <div style={{ flex: "1", padding: "0 10px", textAlign: "center" }}>
                                        <button
                                            onClick={() => deleteExpense(firebaseID)}
                                            style={{ backgroundColor: "#ff4d4d", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    <div style={{ flex: "1", padding: "0 10px", textAlign: "center" }}>
                                        <Link
                                           href={`edit/${firebaseID}`}
                                            style={{ backgroundColor: "green", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
                                        >
                                            Edit
                                        </Link>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <h4>You have no expenses</h4>
                )}
            </div>



        </>
    );
}

export default Add;