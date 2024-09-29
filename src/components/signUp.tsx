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
      <section className="signup-section">
        <div className="signup-container">
          <a href="#" className="logo">Signup</a>
          <div className="form-box">
            <div className="form-inner">
              <h1 className="title">Signup to your account</h1>
              <div className="input-box">
                <label htmlFor="name">Your name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Uzair Rehan"
                  required
                  className="input-field"
                />
              </div>
              <div className="input-box">
                <label htmlFor="email">Your email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  required
                  className="input-field"
                />
              </div>
              <div className="input-box">
                <label htmlFor="password">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  className="input-field"
                />
              </div>

              <button
                onClick={() => handleSubmit(email, password)}
                className="signup-button"
              >
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
