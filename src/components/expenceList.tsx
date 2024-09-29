import { deleteExpense } from "@/firebase/firebasefirestore";
import { ExpenseType } from "@/types/types";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ExpenceList({expense}:any) {
    const [loading, setLoading] = useState(true);
        setLoading(false)
    
    return ( <>
    
            {loading ? (
                <div className="loading"></div>
            ) : expense.length > 0 ? (
                <ul style={{ listStyle: "none", padding: "0" }}>
                    {expense.map(({ amount, category, date, note, title, id, firebaseID }:ExpenseType) => {

                        return (
                            <li key={id} style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                border: "1px solid #ccc",
                                padding: "10px",
                                marginBottom: "10px",
                                borderRadius: "8px"
                            }}>
                                <div style={{ flexGrow: 1 }}>
                                    <p><strong>Title:</strong> {title}</p>
                                    <p><strong>Amount:</strong> &#8383; {amount}</p>
                                    <p><strong>Category:</strong> {category}</p>
                                    <p><strong>Date:</strong> {date.toLocaleDateString()}</p>
                                    <p><strong>Note:</strong> {note}</p>
                                </div>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <button
                                        onClick={() => deleteExpense(firebaseID)}
                                        style={{
                                            backgroundColor: "#f44336",
                                            color: "white",
                                            padding: "8px 12px",
                                            border: "none",
                                            borderRadius: "4px",
                                            cursor: "pointer"
                                        }}>
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => deleteExpense(firebaseID)}
                                        style={{
                                            backgroundColor: "#4CAF50",
                                            color: "white",
                                            padding: "8px 12px",
                                            border: "none",
                                            borderRadius: "4px",
                                            cursor: "pointer"
                                        }}>
                                        Edit
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <h4>You have no expenses</h4>
            )}
    </> );
}

export default ExpenceList;