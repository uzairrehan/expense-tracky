"use client";
import ExpenceList from "@/components/expenceList";
import Sidebar from "@/components/sidebar";
import { saveExpense } from "@/firebase/firebasefirestore";
import { CategoryType } from "@/types/types";
import { useState } from "react";


function Add() {

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('None');
    const [note, setNote] = useState('');
    const [date] = useState(new Date());

 



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


            <ExpenceList val={"add"}/>

        </>
    );
}

export default Add; 