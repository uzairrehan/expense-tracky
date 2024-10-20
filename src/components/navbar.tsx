// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { signOutFunc } from "@/firebase/firebaseauth";
// import Image from "next/image";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleMenuToggle = () => {
//     setIsMenuOpen((prev) => !prev);
//   };

//   return (
//     <nav className="bg-blue-500">
//       <div className="flex justify-between items-center p-4">
//         <div className="flex items-center">
//           <Link href="/">
//             <Image src={"/images/2.png"} width={100} height={80} alt={"Logo"} />
//           </Link>
//         </div>

//         <div className="hidden md:flex items-center space-x-4">
//           <Link href="/dashboard">
//             <button className="text-white border border-white rounded px-4 py-2 hover:bg-white hover:text-blue-500 transition">
//               Home
//             </button>
//           </Link>
//           <Link href="/dashboard/add">
//             <button className="text-white border border-white rounded px-4 py-2 hover:bg-white hover:text-blue-500 transition">
//               Add
//             </button>
//           </Link>
//           <button
//             className="text-white border border-red-500 rounded px-4 py-2 bg-red-500 hover:bg-red-600 transition"
//             onClick={signOutFunc}
//           >
//             Sign Out
//           </button>
//         </div>

//         <div className="md:hidden">
//           <button onClick={handleMenuToggle} className="text-white">
//             Menu
//           </button>
//         </div>
//       </div>

//       {isMenuOpen && (
//         <div className="md:hidden bg-blue-600 p-4">
//           <Link href="/dashboard">
//             <button onClick={handleMenuToggle} className="text-white block w-full text-left py-2 hover:bg-blue-500 transition">
//               Home
//             </button>
//           </Link>
//           <Link href="/dashboard/add">
//             <button onClick={handleMenuToggle} className="text-white block w-full text-left py-2 hover:bg-blue-500 transition">
//               Add
//             </button>
//           </Link>
//           <button
//             onClick={() => {
//               handleMenuToggle();
//               signOutFunc();
//             }}
//             className="text-white block w-full text-left py-2 hover:bg-blue-500 transition"
//           >
//             Sign Out
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <nav className="border-b">
      <div className="flex items-center justify-between p-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">Logo</span>
        </Link>
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/about">
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/services">
                  Services
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/contact">
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col space-y-4">
              <Link href="/about" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                About
              </Link>
              <Link href="/services" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                Services
              </Link>
              <Link href="/contact" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}