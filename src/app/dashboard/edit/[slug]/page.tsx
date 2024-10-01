"use client";

import Sidebar from "@/components/sidebar";
import { db } from "@/firebase/firebasefirestore";
import { CategoryType, ExpenseType } from "@/types/types";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { slug: string } }) {

    // all states that willl be used in this page

    const [loading, setLoading] = useState(true);
    const selID: string = params.slug;
    const [error, setError] = useState<string | null>(null);
    const [expense, setExpense] = useState<ExpenseType | null>(null);
    const [title, setTitle] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [category, setCategory] = useState("None");
    const [note, setNote] = useState<string>("");
    const route = useRouter()
 

    // this func is fetching the dtata and also setting it
    useEffect(() => {
        if (selID) {
            const fetchExpense = async () => {
                try {
                    const expenseRef = doc(db, "expenses", selID as string);
                    const expenseSnap = await getDoc(expenseRef);
                    if (expenseSnap.exists()) {
                        const expenseData = expenseSnap.data() as ExpenseType;
                        setExpense(expenseData);

                        setTitle(expenseData.title);
                        setAmount(expenseData.amount);
                        setCategory(expenseData.category);
                        setNote(expenseData.note || "");
                    } else {
                        setError("Expense not found");
                    }
                } catch (error) {
                    setError("Failed to fetch expense");
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };

            fetchExpense();
        }
    }, [selID]);



    // this dunction is handling the submit
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (title && amount && category !== "None" && note) {
            if (expense) {
                try {
                    const expenseRef = doc(db, "expenses", selID as string);
                    await updateDoc(expenseRef, {
                        title,
                        amount,
                        category,
                        note,
                    });
                    console.log("Expense updated successfully");
                    route.push("/dashboard")

                } catch (error) {
                    setError("Failed to update expense");
                    console.error(error);
                }
            }
        } else {
            console.log("Please enter full information");
        }
    }




    // loading component will show if the data is in process

    if (loading) {
        return <div className="loading"></div>;
    }
    if (error) return <p>{error}</p>;



    return (
        <>
                <Sidebar/>

        <br />
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
    <h1 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Add your expense</h1>
    <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
            <h4 style={{ marginBottom: "8px", color: "#555" }}>Title</h4>
            <input
                type="text"
                value={title}
                onChange={(e) => { setTitle(e.target.value); }}
                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "16px", boxSizing: "border-box" }}
                required
            />
        </div>

        <div style={{ marginBottom: "15px" }}>
            <h4 style={{ marginBottom: "8px", color: "#555" }}>Amount</h4>
            <input
                type="number"
                value={amount}
                onChange={(e) => { setAmount(Number(e.target.value)); }}
                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "16px", boxSizing: "border-box" }}
                required
            />
        </div>

        <div style={{ marginBottom: "15px" }}>
            <h4 style={{ marginBottom: "8px", color: "#555" }}>Category</h4>
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "16px", boxSizing: "border-box" }}
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
            <h4 style={{ marginBottom: "8px", color: "#555" }}>Optional Note</h4>
            <textarea
                value={note}
                onChange={(e) => { setNote(e.target.value); }}
                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "16px", boxSizing: "border-box", minHeight: "80px" }}
            ></textarea>
        </div>

        <button
            type="submit"
            style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
                transition: "background-color 0.3s ease"
            }}

        >
            Save Expense
        </button>
    </form>
</div>

        </>
    )
}