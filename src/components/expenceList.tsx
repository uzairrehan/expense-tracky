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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ExpenceList({ val }: any) {
  const [expense, setExpense] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [amountFilter, setAmountFilter] = useState<number>(0);

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
    const isCategoryMatch =
      categoryFilter === "all" || item.category === categoryFilter;
    const isAmountMatch = amountFilter === 0 || item.amount >= amountFilter;
    return isCategoryMatch && isAmountMatch;
  });

  return (
    <>
      <br />

      <div className="expense-container">
        <div className="filters">
          <label>
            Filtered by category :
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
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
          <label>
            Filters by amoun :
            <input
              type="number"
              value={amountFilter}
              onChange={(e) => setAmountFilter(Number(e.target.value))}
            />
          </label>
        </div>
        <br />
        {loading ? (
          <div></div>
        ) : filteredExpenses.length > 0 ? (
          <ul>
            {filteredExpenses.map(
              ({ amount, category, date, note, title, id, firebaseID }) => {
                return (
                  <li key={id}>
                    <div>
                      <strong>Title:</strong> {title}
                    </div>
                    <div>
                      <strong>Amount:</strong> &#8383; {amount}
                    </div>
                    <div>
                      <strong>Category:</strong> {category}
                    </div>
                    <div>
                      <strong>Date:</strong>{" "}
                      {date.toDate().toLocaleDateString()}
                    </div>
                    <div>
                      <strong>Note:</strong> {note || "N/A"}
                    </div>
                    <div>
                      <button onClick={() => deleteExpense(firebaseID)}>
                        Delete
                      </button>
                      {val === "add" ? (
                        <Link href={`edit/${firebaseID}`}>
                          <button>Edit</button>
                        </Link>
                      ) : (
                        <Link href={`dashboard/edit/${firebaseID}`}>
                          <button>Edit</button>
                        </Link>
                      )}
                    </div>
                  </li>
                );
              }
            )}
          </ul>
        ) : (
          <h4>No expenses match your filters</h4>
        )}
      </div>
    </>
  );
}

export default ExpenceList;
