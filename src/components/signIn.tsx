"use client";

import { useState } from "react";
import { loginWithEmailPassword, passwordReset } from "@/firebase/firebaseauth";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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
      alert("Please enter your email address to reset your password.");
    }
  }
  return (
    <form>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="text-center text-sm flex justify-end items-center">
          <a href="#" className="underline" onClick={handlePasswordReset}>
            Forgot password?
          </a>
        </div>
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            placeholder="Password"
            type="password"
            autoCapitalize="none"
            autoComplete="current-password"
            disabled={isLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
