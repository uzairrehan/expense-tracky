import { deleteExpense } from "@/firebase/firebasefirestore";
import { useEffect, useState } from "react";
import { auth } from "@/firebase/firebaseauth";
import { db } from "@/firebase/firebasefirestore";
import { onAuthStateChanged } from "firebase/auth";
import { collection, DocumentData, onSnapshot, query, Unsubscribe, where } from "firebase/firestore";
import Link from "next/link";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ExpenceList({ val }:any) {
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
<div className="expense-container">
    {loading ? (
        <div className="loading"></div>
    ) : expense.length > 0 ? (
        <ul className="expense-list">
            {expense.map(({ amount, category, date, note, title, id, firebaseID }) => {
                return (
                    <li key={id} className="expense-item">
                        <div className="expense-title">
                            <strong>Title:</strong> {title}
                        </div>
                        <div className="expense-amount">
                            <strong>Amount:</strong> &#8383; {amount}
                        </div>
                        <div className="expense-category">
                            <strong>Category:</strong> {category}
                        </div>
                        <div className="expense-date">
                            <strong>Date:</strong> {date.toDate().toLocaleDateString()}
                        </div>
                        <div className="expense-note">
                            <strong>Note:</strong> {note || "N/A"}
                        </div>
                        <div className="expense-delete">
                            <button onClick={() => {deleteExpense(firebaseID)  }
                            }>Delete</button>
                        </div>
                        <div className="expense-edit">
                            {val === "add" ? (
                                <Link href={`edit/${firebaseID}`}>Edit</Link>
                            ) : (
                                <Link href={`dashboard/edit/${firebaseID}`}>Edit</Link>
                            )}
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