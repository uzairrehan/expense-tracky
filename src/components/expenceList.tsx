import { deleteExpense } from "@/firebase/firebasefirestore";
import { useEffect, useState } from "react";
import { auth } from "@/firebase/firebaseauth";
import { db } from "@/firebase/firebasefirestore";
import { onAuthStateChanged } from "firebase/auth";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {
  collection,
  DocumentData,
  onSnapshot,
  query,
  Unsubscribe,
  where,
} from "firebase/firestore";
import Link from "next/link";
import { Doughnutt } from "./doghnut";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ExpenseList() {
  const [expense, setExpense] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [amountFilter, setAmountFilter] = useState<number>(0);
  const category_order = [
    "Luxuries",
    "Investments",
    "Education",
    "Bills",
    "Transport",
    "Food",
  ];
  const [doghnutData, setDoghnutData] = useState<number[]>([]);

  const sortedAndSummedExpenses = () => {
    const categoryTotals: Record<string, number> = {};
    const sortedExpenses: DocumentData[] = [];

    category_order.forEach((category) => {
      categoryTotals[category] = 0;
    });

    expense.forEach((expenseItem) => {
      const { category, amount } = expenseItem;
      if (category_order.includes(category)) {
        sortedExpenses.push(expenseItem);
        categoryTotals[category] += amount;
      }
    });

    sortedExpenses.sort((a, b) => {
      const categoryIndexA = category_order.indexOf(a.category);
      const categoryIndexB = category_order.indexOf(b.category);

      if (categoryIndexA === categoryIndexB) {
        return a.amount - b.amount;
      }
      return categoryIndexA - categoryIndexB;
    });

    const totalsArray = category_order.map(
      (category) => categoryTotals[category]
    );
    setDoghnutData(totalsArray);

    return { sortedExpenses, totalsArray };
  };

  useEffect(() => {
    sortedAndSummedExpenses();
  }, [expense]);

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
      detachOnAuthListener(); // Corrected position of detachOnAuthListener
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
      <Doughnutt dataa={doghnutData} />
      <div className="flex gap-2 m-2 mb-2">
        <FormControl size="small" className="w-1/2">
          <InputLabel id="demo-select-small-label">Filter by Category</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={categoryFilter}
            label="Category"
            required
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
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
          className="w-1/2"
          id="outlined-basic"
          label="Filter by Amount"
          variant="outlined"
          size="small"
          type="number"
          value={amountFilter}
          onChange={(e) => setAmountFilter(Number(e.target.value))}
          required
        />
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : filteredExpenses.length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Note</TableCell>
                <TableCell align="right">Delete</TableCell>
                <TableCell align="right">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredExpenses.map(({ amount, category, date, note, title, firebaseID }) => (
                <TableRow
                  key={firebaseID}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{title}</TableCell>
                  <TableCell align="right">{amount}</TableCell>
                  <TableCell align="right">{category}</TableCell>
                  <TableCell align="right">{date.toDate().toLocaleDateString()}</TableCell>
                  <TableCell align="right">{note}</TableCell>
                  <TableCell align="right">
                    <Button onClick={() => deleteExpense(firebaseID)} variant="outlined" color="error">
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Link href={`dashboard/edit/${firebaseID}`}>
                      <Button variant="outlined" color="warning">
                        Edit
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <>No expense</>
      )}
    </>
  );
}

export default ExpenseList; // Corrected the export statement
