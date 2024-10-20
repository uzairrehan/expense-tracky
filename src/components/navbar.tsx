"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { signOutFunc } from "@/firebase/firebaseauth";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="border-b">
      <div className="flex items-center justify-between p-4">
        <Link href="/" className="flex items-center space-x-2 w-[50px] ">
          <Image
            src={"/images/logo.png"}
            alt={"logo"}
            width={150}
            height={150}
          />
        </Link>
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  href="/dashboard"
                >
                  Dashboard
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  href="/dashboard/add"
                >
                  Add
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem className="text-destructive">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  onClick={signOutFunc}
                >
                  Logout
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
              <Link
                href="/dashboard"
                className="text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/add"
                className="text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                Add
              </Link>
              <Button
                className="text-lg font-medium "
                variant={"destructive"}
                onClick={() =>{
                   setIsOpen(false)
                   signOutFunc()
                  }}
              >
                Logout
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
