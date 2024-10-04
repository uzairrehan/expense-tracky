"use client";

import ExpenceList from "@/components/expenceList";
// import Sidebar from "@/components/sidebar";
import { auth } from "@/firebase/firebaseauth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


function Dashboard() {
  const route = useRouter()
  useEffect(()=>{
    if(!auth){
      route.push("/authenticate")
    }
  }, [])
  return (
    <>
      {/* <Sidebar /> */}
      <ExpenceList />
    </>
  );
}

export default Dashboard;
