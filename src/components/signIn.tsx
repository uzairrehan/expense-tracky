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
            <section className="signin-container">
                <div className="form-wrapper">
                    <h1 className="form-title">Sign In to Your Account</h1>
                    <div className="input-group">
                        <label htmlFor="email" className="input-label">Your Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="name@company.com"
                            className="input-field"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password" className="input-label">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="input-field"
                            required
                        />
                    </div>
                    <div className="forgot-password">
                        <button onClick={() => passwordReset(email)} className="link-btn">
                            Forgot Password?
                        </button>
                    </div>
                    <button onClick={() => handleSubmit(email, password)} className="signin-btn">
                        Sign In
                    </button>

                </div>
            </section>
        </>
    );
}

export default SignIn;
