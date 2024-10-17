"use client";

import { saveExpense } from "@/firebase/firebasefirestore";
import { CategoryType } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Add() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [date] = useState(new Date());
  const route = useRouter()
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (amount && title && category && note) {
      e.preventDefault();
      saveExpense(title, amount, date, category, note);
      setAmount(0)
      setCategory("none");
      setTitle("");
      setNote("");
      route.push("/dashboard")
    } else {
      e.preventDefault();
      console.log("please enter full information");
    }
  }

  return (
<>
  <form onSubmit={handleSubmit} className="flex flex-col p-5 gap-4">
    <input
      id="title"
      type="text"
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
      className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
      id="amount"
      type="number"
      placeholder="Amount"
      value={amount}
      onChange={(e) => setAmount(Number(e.target.value))}
      required
      className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <div className="relative">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as CategoryType)}
        required
        className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          Category
        </option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Bills">Bills</option>
        <option value="Education">Education</option>
        <option value="Investments">Investments</option>
        <option value="Luxuries">Luxuries</option>
        <option value="Other">Other</option>
      </select>
    </div>

    <textarea
      id="note"
      placeholder="Optional Note"
      value={note}
      onChange={(e) => setNote(e.target.value)}
      className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    ></textarea>

    <button
      type="submit"
      className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600 transition"
    >
      Save Expense
    </button>
  </form>
</>

  );
}

export default Add;
