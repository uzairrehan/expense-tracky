import { deleteExpense } from "@/firebase/firebasefirestore";
import { useEffect, useState } from "react";
import { auth } from "@/firebase/firebaseauth";
import { db } from "@/firebase/firebasefirestore";
import { onAuthStateChanged } from "firebase/auth";
import { collection, DocumentData, onSnapshot, query, Unsubscribe, where } from "firebase/firestore";
import Link from "next/link";



function ExpenceList({ val }:string) {
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


    return (<>
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

                                    {val == "add" ? <Link
                                        href={`edit/${firebaseID}`}
                                        style={{ backgroundColor: "green", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
                                    >
                                        Edit
                                    </Link> :
                                        <Link
                                            href={`dashboard/edit/${firebaseID}`}
                                            style={{ backgroundColor: "green", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
                                        >
                                            Edit
                                        </Link>

                                    }

                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <h4>You have no expenses</h4>
            )}
        </div>

    </>);
}

export default ExpenceList;