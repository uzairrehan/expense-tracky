"use client";

import ExpenceList from "@/components/expenceList";
import Sidebar from "@/components/sidebar";

function Dashboard() {

    return (
        <>        <Sidebar/>

            <ExpenceList val={"dashboard"} />
        </>
    );
}

export default Dashboard;