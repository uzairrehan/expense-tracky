"use client";

// import { Barr } from "@/components/bar";
// import { Doughnutt } from "@/components/doghnut";
import ExpenceList from "@/components/expenceList";
import Sidebar from "@/components/sidebar";
// import Sidebar from "@/components/sidebar";


function Dashboard() {
  return (
    <>
      {/* <Doughnutt/> */}
      {/* <Barr/> */}
      <Sidebar />
      <ExpenceList val={"dashboard"} />
    </>
  );
}

export default Dashboard;
