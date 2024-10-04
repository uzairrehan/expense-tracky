"use client";

// import Sidebar from "@/components/sidebar";
import { db } from "@/firebase/firebasefirestore";
import {  CategoryType, ExpenseType } from "@/types/types";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
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
      {/* <Sidebar /> */}

      <form onSubmit={handleSubmit} className="flex p-5 flex-col gap-4">
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          size="small"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
        />

        <TextField
          id="outlined-basic"
          label="Amount"
          variant="outlined"
          size="small"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
          fullWidth
        />

        <FormControl size="small" fullWidth>
          <InputLabel id="demo-select-small-label">Category</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={category}
            label="Age"
            required
            onChange={(e) => setCategory(e.target.value as CategoryType)}
          >
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Transport">Transport</MenuItem>
            <MenuItem value="Bills">Bills</MenuItem>
            <MenuItem value="Education">Education</MenuItem>
            <MenuItem value="Investments">Investments</MenuItem>
            <MenuItem value="Luxuries">Luxuries</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="outlined-basic"
          label="Optional Note"
          variant="outlined"
          size="small"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></TextField>

        <Button variant="outlined" type="submit" color="success" size="large">
          Save Expense
        </Button>
      </form>


    </>
  );
}
