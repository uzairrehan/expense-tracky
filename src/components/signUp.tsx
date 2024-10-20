"use client";

import { useState } from "react";
import { signupWithEmailPassword } from "@/firebase/firebaseauth";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    signupWithEmailPassword(email, password, name);
    setIsLoading(false);
  }

  return (
    <form>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="name">
            Name
          </Label>
          <Input
            id="name"
            placeholder="Uzair Rehan"
            type="name"
            autoComplete="name"
            disabled={isLoading}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            placeholder="uzairrehann@gmail.com"
            type="email"
            autoComplete="email"
            disabled={isLoading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
            autoComplete="new-password"
            disabled={isLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button disabled={isLoading} onClick={handleSubmit}>
          {isLoading && <AiOutlineLoading3Quarters className="mr-2 h-4 w-4" />}
          Sign Up
        </Button>
      </div>
    </form>
  );
}

export default SignUp;
