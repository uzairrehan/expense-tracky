"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/firebase/firebaseconfig";
export default function Home() {
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

  return <></>;
}
