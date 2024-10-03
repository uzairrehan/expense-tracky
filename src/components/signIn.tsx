"use client";

import { loginWithEmailPassword, passwordReset } from "@/firebase/firebaseauth";
import { useState } from "react";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(email: string, password: string) {
    loginWithEmailPassword(email, password);
  }

  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-dark-green">
  <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
    <h1 className="text-2xl font-bold text-dark-green mb-6 text-center">
      Sign In to Your Account
    </h1>

    <div className="mb-4">
      <label htmlFor="email" className="block text-dark-green font-semibold mb-2">
        Your Email
      </label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        name="email"
        id="email"
        placeholder="name@company.com"
        required
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="password" className="block text-dark-green font-semibold mb-2">
        Password
      </label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        name="password"
        id="password"
        placeholder="••••••••"
        required
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>

    <div className="mb-6 text-right">
      <button
        onClick={() => passwordReset(email)}
        className="text-green-500 hover:text-green-700 focus:outline-none font-semibold"
      >
        Forgot Password?
      </button>
    </div>

    <button
      onClick={() => handleSubmit(email, password)}
      className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      Sign In
    </button>
  </div>
</section>

    </>
  );
}

export default SignIn;
