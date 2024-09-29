"use client";

import { loginWithEmailPassword, passwordReset } from "@/firebase/firebaseauth";
import Link from "next/link";
import { useState } from "react";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(email: string, password: string) {
        loginWithEmailPassword(email, password);
    }

    return (
        <>
            <section>
                <div>
                    <a href="#">
                        Signin
                    </a>
                    <div>
                        <div>
                            <h1>
                                Signin to your account
                            </h1>
                            <div>
                                <label htmlFor="email">Your email</label>
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
                            <div>
                                <label htmlFor="password">Password</label>
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
                                <button onClick={() => passwordReset(email)}>
                                    Forgot password?
                                </button>
                            </div>
                            <button onClick={() => handleSubmit(email, password)}>
                                Signin
                            </button>
                            <p>
                                Want to <Link href={"signup"}><b>signup?</b></Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SignIn;
