"use client";

import ExpenceList from "@/components/expenceList";
import { signOutFunc } from "@/firebase/firebaseauth";


function Dashboard() {

    return (
        <>  
            <button onClick={signOutFunc}>Signout</button>
            <br />
            <ExpenceList val={"dashboard"}/>
        </>
    );
}

export default Dashboard;