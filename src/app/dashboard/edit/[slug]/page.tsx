"use client";

import { db } from "@/firebase/firebasefirestore";
import { CategoryType, ExpenseType } from "@/types/types";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const [loading, setLoading] = useState(true);
  const selID: string = params.slug;
  const [error, setError] = useState<string | null>(null);
  const [expense, setExpense] = useState<ExpenseType | null>(null);
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState("None");
  const [note, setNote] = useState<string>("");
  const route = useRouter();

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
          route.push("/dashboard");
        } catch (error) {
          setError("Failed to update expense");
          console.error(error);
        }
      }
    } else {
      console.log("Please enter full information");
    }
  }

  if (loading) {
    return <div></div>;
  }
  if (error) return <p>{error}</p>;

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
