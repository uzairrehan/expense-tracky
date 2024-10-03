"use client";

import SignIn from "@/components/signIn";
import SignUp from "@/components/signUp";
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
  }, [route]);

  return (
    <>
      {pageState === "SignUp" ? (
        <SignUp setPageState={setPageState} pageState={pageState} />
      ) : (
        <SignIn setPageState={setPageState} pageState={pageState} />
      )}
    </>
  );
}

export default Authenticate;
