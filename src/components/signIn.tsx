"use client";

import { useState } from "react";
import { googleSign, loginWithEmailPassword, passwordReset } from "@/firebase/firebaseauth";
import { setStateType } from "@/types/types";

function SignIn({ setPageState, pageState }: setStateType) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    loginWithEmailPassword(email, password);
  }

  function handlePasswordReset() {
    if (email) {
      passwordReset(email);
    } else {
      alert("Please enter your email address to reset your password.");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="mb-4 flex justify-center items-center">
        <button
          className={`mr-2 px-4 py-2 rounded ${pageState === "SignUp" ? "bg-blue-500 text-white" : "border border-blue-500 text-blue-500"}`}
          onClick={() => setPageState("SignUp")}
        >
          Sign Up
        </button>
        <button
          className={`px-4 py-2 rounded ${pageState === "SignIn" ? "bg-blue-500 text-white" : "border border-blue-500 text-blue-500"}`}
          onClick={() => setPageState("SignIn")}
        >
          Sign In
        </button>
      </div>

      <h1 className="text-2xl text-center mb-3">Sign In to Your Account</h1>

      <form noValidate onSubmit={handleSubmit} className="w-full max-w-xs">
        <div className="mb-2">
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            name="email"
            autoComplete="email"
          />
        </div>

        <div className="mb-2">
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            name="password"
          />
        </div>

        <button
          className="text-blue-500 font-bold mb-2"
          onClick={handlePasswordReset}
          type="button"
        >
          Forgot Password?
        </button>

        <button
          className="w-full px-4 py-2 border border-blue-500 text-blue-500 rounded mt-2"
          onClick={handleSubmit}
          type="button"
        >
          Sign In
        </button>
        <button
          className="w-full px-4 py-2 border border-yellow-500 text-yellow-500 rounded mt-2"
          onClick={googleSign}
          type="button"
        >
          Google Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
