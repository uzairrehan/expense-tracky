"use client";

import { signOutFunc } from "@/firebase/firebaseauth";
import Link from "next/link";

const Sidebar = () => {
    return (
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  }}
>
  <div style={{ display: "flex", gap: "20px" }}>
    <Link href={"/dashboard/profile"}>
      <div
        style={{
          color: "#fff",
          textDecoration: "none",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          transition: "color 0.3s ease",
        }}
      >
        Profile
      </div>
    </Link>

    <Link href={"/dashboard"}>
      <div
        style={{
          color: "#fff",
          textDecoration: "none",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          transition: "color 0.3s ease",
        }}

      >
        View
      </div>
    </Link>

    <Link href={"/dashboard/add"}>
      <div
        style={{
          color: "#fff",
          textDecoration: "none",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          transition: "color 0.3s ease",
        }}

      >
        Add
      </div>
    </Link>
  </div>

  <button
    onClick={signOutFunc}
    style={{
      backgroundColor: "#dc3545",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    }}

  >
    Logout
  </button>
</div>

    );
};

export default Sidebar;
