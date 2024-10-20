import { deleteExpense } from "@/firebase/firebasefirestore";
import { useEffect, useState } from "react";
import { auth } from "@/firebase/firebaseauth";
import { db } from "@/firebase/firebasefirestore";
import { onAuthStateChanged } from "firebase/auth";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  collection,
  DocumentData,
  onSnapshot,
  query,
  Unsubscribe,
  where,
} from "firebase/firestore";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MyPieChart } from "./piechart";

function ExpenseList() {
  const [expense, setExpense] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [amountFilter, setAmountFilter] = useState<number>(0);

 
  useEffect(() => {
    const detachOnAuthListener = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchExpensesRealtime();
      }
    });

    return () => {
      if (readTodosRealtime) {
        console.log("Component Unmount.");
        readTodosRealtime();
      }
      detachOnAuthListener();
    };
  }, []);

  let readTodosRealtime: Unsubscribe;

  const fetchExpensesRealtime = () => {
    const collectionRef = collection(db, "expenses");
    const currentUserUID = auth.currentUser?.uid;
    const condition = where("uid", "==", currentUserUID);
    const q = query(collectionRef, condition);
    const expenseClone = [...expense];

    readTodosRealtime = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        const todo = change.doc.data();
        todo.id = change.doc.id;
        if (change.type === "added") {
          expenseClone.push(todo);
          setExpense([...expenseClone]);
        }
        if (change.type === "modified") {
          const index = expenseClone.findIndex((t) => t.id === todo.id);
          if (index !== -1) {
            expenseClone[index] = todo;
          }
          setExpense([...expenseClone]);
          console.log("modified");
        }
        if (change.type === "removed") {
          console.log("removed", change);

          const index = expenseClone.findIndex((t) => t.id === todo.id);
          if (index !== -1) {
            expenseClone.splice(index, 1);
            setExpense([...expenseClone]);
          }
        }
      });
      setLoading(false);
    });
  };

  const filteredExpenses = expense.filter((item) => {
    const isCategoryMatch =
      categoryFilter === "all" || item.category === categoryFilter;
    const isAmountMatch = amountFilter === 0 || item.amount >= amountFilter;
    return isCategoryMatch && isAmountMatch;
  });

  return (
    <>
        <MyPieChart doghnutData={expense}/>
    
      <div className="flex gap-2 m-2 mb-2">
        <div className="relative w-1/2">
          <Select
            value={categoryFilter}
            onValueChange={(e) => setCategoryFilter(e)}
            required
          >
            <SelectTrigger className="w-full ">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem  value="all" defaultChecked >All</SelectItem >
              <SelectItem  value="Food">Food</SelectItem >
              <SelectItem  value="Transport">Transport</SelectItem >
              <SelectItem  value="Bills">Bills</SelectItem >
              <SelectItem  value="Education">Education</SelectItem >
              <SelectItem  value="Investments">Investments</SelectItem >
              <SelectItem  value="Luxuries">Luxuries</SelectItem >
              <SelectItem  value="Other">Other</SelectItem >
            </SelectContent>
          </Select>
        </div>

        <Input
          className="w-1/2 p-2 "
          id="outlined-basic"
          placeholder="Filter by Amount"
          type="number"
          value={amountFilter}
          onChange={(e) => setAmountFilter(Number(e.target.value))}
          required
        />
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : filteredExpenses.length > 0 ? (
        <div className="overflow-x-auto m-2">
          <Table className="min-w-full ">
            <TableCaption>A list of your All Expenses.</TableCaption>

            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Title</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Note</TableHead>
                <TableHead className="text-right">Delete</TableHead>
                <TableHead className=" text-right">Edit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.map(
                ({ amount, category, date, note, title, firebaseID }) => (
                  <TableRow key={firebaseID}>
                    <TableCell>{title}</TableCell>
                    <TableCell>{amount}</TableCell>
                    <TableCell>{category}</TableCell>
                    <TableCell>{date.toDate().toLocaleDateString()}</TableCell>
                    <TableCell>{note}</TableCell>
                    <TableCell className=" text-right">
                      <Button
                        onClick={() => deleteExpense(firebaseID)}
                        variant={"destructive"}
                      >
                        Delete
                      </Button>
                    </TableCell>
                    <TableCell className=" text-right">
                      <Link href={`dashboard/edit/${firebaseID}`}>
                        <Button>Edit</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center">No expense</div>
      )}
  {/* {console.log(doghnutData)} */}

    </>
  );
}

export default ExpenseList;
 