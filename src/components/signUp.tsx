"use client";

import { signupWithEmailPassword } from "@/firebase/firebaseauth";
import { useState } from "react";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  function handleSubmit(email: string, password: string) {
    signupWithEmailPassword(email, password, name);
  }

  return (
    <>
      <section>
        <div>
          <div>
            <div>
              <h1>Sign In to Your Account</h1>

              <div>
                <label htmlFor="name">Your Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Uzair Rehan"
                  required
                />
              </div>

              <div>
                <label htmlFor="email">Your Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button onClick={() => handleSubmit(email, password)}>
                Signup
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUp;
