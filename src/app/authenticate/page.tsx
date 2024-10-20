"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/firebase/firebaseconfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaGoogle } from "react-icons/fa";
import SignIn from "@/components/signIn";
import SignUp from "@/components/signUp";
import { googleSign } from "@/firebase/firebaseauth";

export default function AuthTabs() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const route = useRouter();
  function Google() {
    setIsLoading(true);
    googleSign();
    setIsLoading(false);
  }

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (loggedInUser) => {
      if (loggedInUser) {
        route.push("/dashboard");
      } else {
        route.push("/authenticate");
      }
    });
  }, [route]);

  return (
    <Tabs defaultValue="signin" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin">Sign In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <SignIn />
      </TabsContent>
      <TabsContent value="signup">
        <SignUp />
      </TabsContent>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        className="w-full"
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={Google}
      >
        {isLoading ? (
          <AiOutlineLoading3Quarters className="mr-2 h-4 w-4" />
        ) : (
          <FaGoogle className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </Tabs>
  );
}
