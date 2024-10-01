"use client";
import ExpenceList from "@/components/expenceList";
import Sidebar from "@/components/sidebar";
import { saveExpense } from "@/firebase/firebasefirestore";
import { CategoryType } from "@/types/types";
import { useState } from "react";

function Add() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("None");
  const [note, setNote] = useState("");
  const [date] = useState(new Date());

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (amount && title && category !== "None" && note) {
      e.preventDefault();
      saveExpense(title, amount, date, category, note);
      setAmount(0);
      setCategory("none");
      setTitle("");
      setNote("");
    } else {
      e.preventDefault();
      console.log("please enter full information");
    }
  }

  return (
    <>
      <Sidebar />

      

      <div className="p-6 bg-white shadow-lg rounded-lg">
  <h1 className="text-2xl font-bold text-dark-green mb-6">Add your expense</h1>
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <h4 className="text-dark-green font-semibold">Title</h4>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="mt-2 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>

    <div className="mb-4">
      <h4 className="text-dark-green font-semibold">Amount</h4>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        required
        className="mt-2 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>

    <div className="mb-4">
      <h4 className="text-dark-green font-semibold">Category</h4>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as CategoryType)}
        required
        className="mt-2 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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

    <div className="mb-4">
      <h4 className="text-dark-green font-semibold">Optional Note</h4>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="mt-2 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      ></textarea>
    </div>

    <button
      type="submit"
      className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
    >
      Save Expense
    </button>
  </form>
</div>


      <ExpenceList val={"add"} />
    </>
  );
}

export default Add;
