"use client";

import { signOutFunc } from "@/firebase/firebaseauth";


function Dashboard() {

    return (
        <>
            
            <button onClick={signOutFunc}>Signout</button>
            <br />
            hello im dashboard
        </>
    );
}

export default Dashboard;