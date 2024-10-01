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

        <div >
    <h1 >Add your expense</h1>
    <form onSubmit={handleSubmit}>
        <div >
            <h4 >Title</h4>
            <input
                type="text"
                value={title}
                onChange={(e) => { setTitle(e.target.value); }}
                required
            />
        </div>

        <div >
            <h4 >Amount</h4>
            <input
                type="number"
                value={amount}
                onChange={(e) => { setAmount(Number(e.target.value)); }}
                required
            />
        </div>

        <div >
            <h4 >Category</h4>
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
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

        <div >
            <h4 >Optional Note</h4>
            <textarea
                value={note}
                onChange={(e) => { setNote(e.target.value); }}
                
            ></textarea>
        </div>

        <button
            type="submit"

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