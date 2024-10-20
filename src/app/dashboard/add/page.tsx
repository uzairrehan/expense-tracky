"use client";

import { saveExpense } from "@/firebase/firebasefirestore";
import { CategoryType } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import React from "react";

function Add() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [date] = useState(new Date());
  const route = useRouter();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (amount && title && category && note) {
      e.preventDefault();
      saveExpense(title, amount, date, category, note);
      setAmount(0);
      setCategory("none");
      setTitle("");
      setNote("");
      route.push("/dashboard");
    } else {
      e.preventDefault();
      console.log("please enter full information");
    }
  }

  return (
    <>
      <Input
        id="title"

        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <Input
        id="amount"
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        required
      />

      <Select
        value={category}
        onChange={(e) => setCategory(e.target.value as CategoryType)}
        required
      >
        <SelectTrigger>
          <SelectValue placeholder="Category" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="Food">Food</SelectItem>
          <SelectItem value="Transport">Transport</SelectItem>
          <SelectItem value="Bills">Bills</SelectItem>
          <SelectItem value="Education">Education</SelectItem>
          <SelectItem value="Investments">Investments</SelectItem>
          <SelectItem value="Luxuries">Luxuries</SelectItem>
          <SelectItem value="Other">Other</SelectItem>
        </SelectContent>
      </Select>

      <Textarea
        id="note"
        placeholder="SelectItemal Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      ></Textarea>

      <Button onClick={handleSubmit}>Save Expense</Button>
    </>
  );
}

export default Add;
