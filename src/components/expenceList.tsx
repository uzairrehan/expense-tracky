import { deleteExpense } from "@/firebase/firebasefirestore";
import { useEffect, useState } from "react";
import { auth } from "@/firebase/firebaseauth";
import { db } from "@/firebase/firebasefirestore";
import { onAuthStateChanged } from "firebase/auth";
import { collection, DocumentData, onSnapshot, query, Unsubscribe, where } from "firebase/firestore";
import Link from "next/link";
import { Doughnutt } from "./doghnut";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ExpenceList({ val }: any) {
  const [expense, setExpense] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [amountFilter, setAmountFilter] = useState<number>(0);
  const category_order = ['Luxuries', 'Investments', 'Education', 'Bills', 'Transport', 'Food'];
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

    const totalsArray = category_order.map((category) => categoryTotals[category]);
    setDoghnutData(totalsArray);

    return { sortedExpenses, totalsArray };
  };

  useEffect(() => {
    sortedAndSummedExpenses();
  }, [expense]);
  useEffect(() => {
    const detachOnAuthListiner = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchExpensesRealtime();
      }
    });
    return () => {
      if (readTodosRealtime) {
        console.log("Component Unmount.");
        readTodosRealtime();
        detachOnAuthListiner();
      }
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
    const isCategoryMatch = categoryFilter === "all" || item.category === categoryFilter;
    const isAmountMatch = amountFilter === 0 || item.amount >= amountFilter;
    return isCategoryMatch && isAmountMatch;
  });

  return (
    <>
      <Doughnutt dataa={doghnutData} />

      <div className="expense-container p-6 bg-white shadow-lg rounded-lg">
  <div className="filters mb-6">
    <label className="block text-dark-green font-semibold mb-2">
      Filtered by category:
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="mt-2 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="all">All</option>
        <option value="None">None</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Bills">Bills</option>
        <option value="Education">Education</option>
        <option value="Investments">Investments</option>
        <option value="Luxuries">Luxuries</option>
        <option value="Other">Other</option>
      </select>
    </label>
    <label className="block text-dark-green font-semibold mb-2">
      Filters by amount:
      <input
        type="number"
        value={amountFilter}
        onChange={(e) => setAmountFilter(Number(e.target.value))}
        className="mt-2 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </label>
  </div>
  {loading ? (
    <div className="text-center text-gray-500">Loading...</div>
  ) : filteredExpenses.length > 0 ? (
    <ul className="space-y-4">
      {filteredExpenses.map(
        ({ amount, category, date, note, title, id, firebaseID }) => {
          return (
            <li key={id} className="p-4 border rounded-lg shadow hover:shadow-lg transition">
              <div className="text-dark-green font-semibold">
                <strong>Title:</strong> {title}
              </div>
              <div>
                <strong>Amount:</strong> &#8383; {amount}
              </div>
              <div>
                <strong>Category:</strong> {category}
              </div>
              <div>
                <strong>Date:</strong> {date.toDate().toLocaleDateString()}
              </div>
              <div>
                <strong>Note:</strong> {note || "N/A"}
              </div>
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={() => deleteExpense(firebaseID)}
                  className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none"
                >
                  Delete
                </button>
                {val === "add" ? (
                  <Link href={`edit/${firebaseID}`}>
                    <button className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 focus:outline-none">
                      Edit
                    </button>
                  </Link>
                ) : (
                  <Link href={`dashboard/edit/${firebaseID}`}>
                    <button className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 focus:outline-none">
                      Edit
                    </button>
                  </Link>
                )}
              </div>
            </li>
          );
        }
      )}
    </ul>
  ) : (
    <h4 className="text-center text-dark-green font-semibold">No expenses match your filters</h4>
  )}
</div>
  {console.log(expense)}
    </>
  );
}

export default ExpenceList;
