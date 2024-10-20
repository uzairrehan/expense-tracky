"use client";

import { Button } from "@/components/ui/button";
import {Card,CardHeader, CardTitle, CardContent, CardFooter,} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger,SelectValue,} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/firebase/firebasefirestore";
import { CategoryType, ExpenseType } from "@/types/types";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "@/hooks/use-toast";


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
  const [isLoading, setIsLoading] = useState<boolean>(false);


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

  async function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (title && amount && category !== "None") {
      setIsLoading(true)
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
          toast({
            title: "Expense Updated !",
          })
          route.push("/dashboard");
        } catch (error) {
          setError("Failed to update expense");
          toast({
            variant: "destructive" ,
            title: "Cant Update Expense !"
          })
          console.error(error);
        }
      }
      setIsLoading(false)

    } else {
      console.log("Please enter full information");
      toast({
        variant: "destructive" ,
        title: "Please enter full information !"
      })
    }
  }

  if (loading) {
    return <div></div>;
  }
  if (error) return <p>{error}</p>;

  return (
    <>
      <Card className="lg:w-2/3 md:w-1/2 sm:w-3/4 m-auto flex gap-2 flex-col h-3/4 justify-center border-none shadow-none">
      <CardHeader>
          <CardTitle>Edit Expense</CardTitle>
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
            
            Save</Button>
        </CardFooter>
      </Card>
    </>
  );
}
