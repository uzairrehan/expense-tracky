"use client";

import { signOutFunc } from "@/firebase/firebaseauth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="sidebar">
      <div className="logo">
        <Image src={"/images/2.png"} width={160} height={80} alt={"Logo"} />
      </div>
      <div className="menu">
        <Link href="/dashboard/profile">
          <div
            className={`menu-item ${
              pathname === "/dashboard/profile" ? "active" : ""
            }`}
          >
            <div>Profile</div>
          </div>
        </Link>
        <Link href="/dashboard">
          <div
            className={`menu-item ${pathname === "/dashboard" ? "active" : ""}`}
          >
            <div>View</div>
          </div>
        </Link>
        <Link href="/dashboard/add">
          <div
            className={`menu-item ${
              pathname === "/dashboard/add" ? "active" : ""
            }`}
          >
            <div>Add</div>
          </div>
        </Link>
      </div>
      <div className="signout" onClick={signOutFunc}>
        Sign Out
      </div>
    </div>
  );
};

export default Sidebar;
