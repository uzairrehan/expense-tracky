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
import { MouseEvent } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Add() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [date] = useState(new Date());
  const route = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    if (amount && title && category) {
      e.preventDefault();
    setIsLoading(true);

      saveExpense(title, amount, date, category, note);
      setAmount(0);
      setCategory("none");
      setTitle("");
      setNote("");
    setIsLoading(false);

      route.push("/dashboard");
    } else {
      e.preventDefault();
      console.log("please enter full information");
    }
  }

  return (
    <>
      <Card className="lg:w-2/3 md:w-1/2 sm:w-3/4 m-auto flex gap-2 flex-col h-3/4 justify-center border-none shadow-none">
        <CardHeader>
          <CardTitle>Add Expense</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2 flex-col w-full">
          <Label htmlFor="text">
            Title :
            <Input
              className="mt-1"
              id="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Label>
          <Label htmlFor="text">
            Amount :
            <Input
              className="mt-1"
              id="amount"
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
            />
          </Label>

          <Label htmlFor="text">
            Category :
            <Select
              value={category}
              onValueChange={(e) => setCategory(e as CategoryType)}
              required
            >
              <SelectTrigger className="mt-1">
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
          </Label>

          <Label htmlFor="text">
            Note :
            <Textarea
              className="mt-1"
              id="note"
              placeholder="Add Note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></Textarea>
          </Label>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit}>
          {isLoading && <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 transform rotate-45" />}
            
            Save
            
            </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default Add;
