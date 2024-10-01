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
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  }}
>
  <div
    style={{
      backgroundColor: "#fff",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      width: "400px",
      textAlign: "center",
    }}
  >
    <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
      Sign In to Your Account
    </h1>

    <div style={{ marginBottom: "15px", textAlign: "left" }}>
      <label htmlFor="email" style={{ fontSize: "14px", color: "#555" }}>
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
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginTop: "5px",
        }}
      />
    </div>

    <div style={{ marginBottom: "15px", textAlign: "left" }}>
      <label htmlFor="password" style={{ fontSize: "14px", color: "#555" }}>
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
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginTop: "5px",
        }}
      />
    </div>

    <div style={{ textAlign: "right", marginBottom: "15px" }}>
      <button
        onClick={() => passwordReset(email)}
        style={{
          backgroundColor: "transparent",
          border: "none",
          color: "#007bff",
          fontSize: "14px",
          cursor: "pointer",
        }}
      >
        Forgot Password?
      </button>
    </div>

    <button
      onClick={() => handleSubmit(email, password)}
      style={{
        backgroundColor: "#007bff",
        color: "#fff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
        width: "100%",
      }}
    >
      Sign In
    </button>
  </div>
</section>
        </>
    );
}

export default SignIn;
