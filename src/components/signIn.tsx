"use client";

import { useState } from "react";
import { loginWithEmailPassword, passwordReset } from "@/firebase/firebaseauth";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "@/hooks/use-toast";


function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    loginWithEmailPassword(email, password);

    setIsLoading(false);
  }

  function handlePasswordReset() {
    if (email) {
      passwordReset(email);
    } else {
      toast({
       variant: "destructive" ,
        title: "Please Enter Email",
      })
    }
  }
  return (
    <form>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="uzairrehann@gmail.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="text-center text-sm flex justify-end items-center">
          <p  className="underline hover:cursor-pointer" onClick={handlePasswordReset}>
            Forgot password?
          </p>
        </div>
        <div className="grid gap-1">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            autoCapitalize="none"
            autoComplete="current-password"
            disabled={isLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button disabled={isLoading} onClick={handleSubmit}>
          {isLoading && <AiOutlineLoading3Quarters className="mr-2 h-4 w-4" />}
          Sign In
        </Button>
      </div>
    </form>
  );
}

export default SignIn;
