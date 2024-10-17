import { deleteExpense } from "@/firebase/firebasefirestore";
import { useEffect, useState } from "react";
import { auth } from "@/firebase/firebaseauth";
import { db } from "@/firebase/firebasefirestore";
import { onAuthStateChanged } from "firebase/auth";

import {
  collection,
  DocumentData,
  onSnapshot,
  query,
  Unsubscribe,
  where,
} from "firebase/firestore";
import Link from "next/link";


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
  // const [doghnutData, setDoghnutData] = useState<number[]>([]);

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
    // setDoghnutData(totalsArray);

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
      <div className="flex gap-2 m-2 mb-2">
        {/* <Doughnutt dataa={doghnutData} className="w-1/2" responsive /> */}
      </div>
  
      <div className="flex gap-2 m-2 mb-2">
        <div className="relative w-1/2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="block w-full p-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Filter by Category</option>
            <option value="all">All</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Bills">Bills</option>
            <option value="Education">Education</option>
            <option value="Investments">Investments</option>
            <option value="Luxuries">Luxuries</option>
            <option value="Other">Other</option>
          </select>
        </div>
  
        <input
          className="w-1/2 p-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2 text-right">Amount</th>
                <th className="border px-4 py-2 text-right">Category</th>
                <th className="border px-4 py-2 text-right">Date</th>
                <th className="border px-4 py-2 text-right">Note</th>
                <th className="border px-4 py-2 text-right">Delete</th>
                <th className="border px-4 py-2 text-right">Edit</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map(
                ({ amount, category, date, note, title, firebaseID }) => (
                  <tr key={firebaseID} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{title}</td>
                    <td className="border px-4 py-2 text-right">{amount}</td>
                    <td className="border px-4 py-2 text-right">{category}</td>
                    <td className="border px-4 py-2 text-right">
                      {date.toDate().toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2 text-right">{note}</td>
                    <td className="border px-4 py-2 text-right">
                      <button
                        onClick={() => deleteExpense(firebaseID)}
                        className="bg-red-500 text-white rounded px-4 py-1 hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="border px-4 py-2 text-right">
                      <Link href={`dashboard/edit/${firebaseID}`}>
                        <button className="bg-yellow-500 text-white rounded px-4 py-1 hover:bg-yellow-600 transition">
                          Edit
                        </button>
                      </Link>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500">No expense</div>
      )}
    </>
  );
  
}

export default ExpenseList;
