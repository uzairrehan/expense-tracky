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
           <section

>
  <div

  >
    <h1 >
      Sign In to Your Account
    </h1>

    <div >
      <label htmlFor="email" >
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

      /> 
    </div>

    <div >
      <label htmlFor="password" >
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

      />
    </div>

    <div>
      <button
        onClick={() => passwordReset(email)}

      >
        Forgot Password?
      </button>
    </div>

    <button
      onClick={() => handleSubmit(email, password)}

    >
      Sign In
    </button>
  </div>
</section>
        </>
    );
}

export default SignIn;
