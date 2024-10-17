"use client";

import Link from "next/link";
import { useState } from "react";
import { signOutFunc } from "@/firebase/firebaseauth";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-blue-500">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <Link href="/">
            <Image src={"/images/2.png"} width={100} height={80} alt={"Logo"} />
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link href="/dashboard">
            <button className="text-white border border-white rounded px-4 py-2 hover:bg-white hover:text-blue-500 transition">
              Home
            </button>
          </Link>
          <Link href="/dashboard/add">
            <button className="text-white border border-white rounded px-4 py-2 hover:bg-white hover:text-blue-500 transition">
              Add
            </button>
          </Link>
          <button
            className="text-white border border-red-500 rounded px-4 py-2 bg-red-500 hover:bg-red-600 transition"
            onClick={signOutFunc}
          >
            Sign Out
          </button>
        </div>

        <div className="md:hidden">
          <button onClick={handleMenuToggle} className="text-white">
            Menu
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-blue-600 p-4">
          <Link href="/dashboard">
            <button onClick={handleMenuToggle} className="text-white block w-full text-left py-2 hover:bg-blue-500 transition">
              Home
            </button>
          </Link>
          <Link href="/dashboard/add">
            <button onClick={handleMenuToggle} className="text-white block w-full text-left py-2 hover:bg-blue-500 transition">
              Add
            </button>
          </Link>
          <button
            onClick={() => {
              handleMenuToggle();
              signOutFunc();
            }}
            className="text-white block w-full text-left py-2 hover:bg-blue-500 transition"
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
