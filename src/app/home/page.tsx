    "use client";

    import { auth } from "@/firebase/firebaseauth";
    import { db, saveExpense } from "@/firebase/firebasefirestore";
    import { onAuthStateChanged } from "firebase/auth";
    import { collection, DocumentData, onSnapshot, query, Unsubscribe, where } from "firebase/firestore";
    import { useEffect, useState } from "react"

    type Category = "Food" | "Transport" | "Bills" | "Education" | "Investments" | "Luxuries" | "Other";


    export default function Home() {
        const [title, setTitle] = useState('');
        const [amount, setAmount] = useState(0);
        const [category, setCategory] = useState('');
        const [note, setNote] = useState('');
        const [date] = useState(new Date());
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

        },[])

        let readTodosRealtime: Unsubscribe;

        const fetchTodosRealtime = () => {
            const collectionRef = collection(db, "expenses");
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
                <h1>title</h1>
                <input type="text"
                    value={title}
                    onChange={(e) => { setTitle(e.target.value) }}
                />
                <h1>amount</h1>
                <input type="number"
                    value={amount}
                    onChange={(e) => { setAmount(Number(e.target.value)) }}
                />
                <h1>category</h1>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                >
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Bills">Bills</option>
                    <option value="Education">Education</option>
                    <option value="Investments">Investments</option>
                    <option value="Luxuries">Luxuries</option>
                    <option value="Other">Other</option>
                </select>

                <h1>optional note</h1>
                <input type="text"
                    value={note}
                    onChange={(e) => { setNote(e.target.value) }}
                />
                <br />
                <br />
                <button onClick={() => {
                    saveExpense(title, amount, date, category, note);
                    setAmount(0);
                    setCategory("")
                    setTitle("")
                    setNote("")
                }}>Add Expense</button>

    {
        allTodos.length > 0 ? (
            allTodos.map(({ amount, category, date, note, title, id }) => {  // Assuming 'id' is available
                return (
                    <div key={id}>
                        <p>Title: {title}</p>
                        <p>Amount: {amount}</p>
                        <p>Category: {category}</p>
                        <p>Date: {date.toDate().toLocaleDateString(date)}</p>
                        <p>Note: {note}
                            <br />
                        </p>
                    </div>
                    
                );
            })
        ) : (
            <h1>Nothing to show</h1>
        )
    }</>)
    }