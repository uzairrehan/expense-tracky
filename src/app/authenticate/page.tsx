"use client";

import SignIn from "@/components/signIn";
import SignUp from "@/components/signUp";
import { googleSign } from "@/firebase/firebaseauth";
import { app } from "@/firebase/firebaseconfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Authenticate() {
  const [pageState, setPageState] = useState("SignUp");

  const route = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (loggedInUser) => {
      if (loggedInUser) {
        route.push("/dashboard");
      } else {
        route.push("/authenticate");
      }
    });
  }, []);
  return (
    <>
      <div>
        <button onClick={googleSign}>Google Signin</button>

        <button onClick={() => setPageState("SignIn")}>Sign In</button>

        <button onClick={() => setPageState("SignUp")}>Sign Up</button>
      </div>

      {pageState == "SignUp" ? <SignUp /> : <SignIn />}
    </>
  );
}

export default Authenticate;
