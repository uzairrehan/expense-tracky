"use client";

import { signOutFunc } from "@/firebase/firebaseauth";
import Link from "next/link";

const Sidebar = () => {
    return (
<div

>
  <div >
    <Link href={"/dashboard/profile"}>
      <div

      >
        Profile
      </div>
    </Link>

    <Link href={"/dashboard"}>
      <div


      >
        View
      </div>
    </Link>

    <Link href={"/dashboard/add"}>
      <div
 

      >
        Add
      </div>
    </Link>
  </div>

  <button
    onClick={signOutFunc}


  >
    Logout
  </button>
</div>

    );
};

export default Sidebar;
