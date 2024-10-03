"use client";
import Sidebar from "@/components/sidebar";
import { saveExpense } from "@/firebase/firebasefirestore";
import { CategoryType } from "@/types/types";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
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
      <Sidebar />

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
            label="Category"
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

      {/* <ExpenceList val={"add"} /> */}
    </>
  );
}

export default Add;
