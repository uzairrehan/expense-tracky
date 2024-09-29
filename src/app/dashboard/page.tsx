"use client";
import { app } from "@/firebase/firebaseconfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Dashboard() {
    const route =  useRouter()
    useEffect(() => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (loggedInUser) => {
            if (loggedInUser) {
                route.push("/dashboard/view");
            }
            else {
                console.log('inside onauthstatechange else statement');
                route.push("/");
            }
        });
    }, [])
    return (
        <>
            this is dashboard
        </>);
}

export default Dashboard;