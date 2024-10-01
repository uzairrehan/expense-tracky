"use client";

import { app } from "@/firebase/firebaseconfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";




export default function Home() {
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
    This is home.... <br />
    You should not be here ;)
    </>
  );
} 
