"use client";

import SignIn from "@/components/signIn";
import SignUp from "@/components/signUp";
import { googleSign } from "@/firebase/firebaseauth";
import { app } from "@/firebase/firebaseconfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


function Authenticate() {
    const [pageState, setPageState] = useState("SignUp")

    const route = useRouter();


    useEffect(() => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (loggedInUser) => {
            if (loggedInUser) {
                route.push("/dashboard");
            }
            else {
                route.push("/authenticate");
            }
        });
    }, [])
    return (
        <>
<div style={{ display: "flex", gap: "15px", justifyContent: "center", padding: "20px" }}>
  <button
    onClick={googleSign}
    style={{
      backgroundColor: "#4285F4",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}

  >
    Google Signin
  </button>

  <button
    onClick={() => setPageState("SignIn")}
    style={{
      backgroundColor: "#007bff",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    }}

  >
    Sign In
  </button>

  <button
    onClick={() => setPageState("SignUp")}
    style={{
      backgroundColor: "#28a745",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    }}

  >
    Sign Up
  </button>
</div>

            {pageState == "SignUp" ?
                <SignUp />
                : <SignIn />}





        </>
    );
}

export default Authenticate;