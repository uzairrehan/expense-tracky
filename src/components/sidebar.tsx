"use client";

import { signOutFunc } from "@/firebase/firebaseauth";
import Link from "next/link";

const Sidebar = () => {
    return (
<div className="navbar">
    <div className="profile-section">
        <div className="profile-pic"></div>
        <Link href={"/dashboard/profile"}><p>Profile</p></Link>
    </div>
    <div className="menu">
        <Link href={"/dashboard"}><div className="menu-item">View</div></Link>
        <Link href={"/dashboard/add"}><div className="menu-item">Add</div></Link>
    </div>
    <button className="logout-btn" onClick={signOutFunc}>Logout</button>
</div>

    );
};

export default Sidebar;
