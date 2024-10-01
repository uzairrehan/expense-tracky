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
  const route = useRouter();

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

  // loading component will show if the data is in process

  if (loading) {
    return <div></div>;
  }
  if (error) return <p>{error}</p>;

  return (
    <>
      <Sidebar />

      <br />
      <div>
        <h1>Add your expense</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <h4>Title</h4>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
            />
          </div>

          <div>
            <h4>Amount</h4>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(Number(e.target.value));
              }}
              required
            />
          </div>

          <div>
            <h4>Category</h4>
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

          <div>
            <h4>Optional Note</h4>
            <textarea
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
              }}
            ></textarea>
          </div>

          <button type="submit">Save Expense</button>
        </form>
      </div>
    </>
  );
}
