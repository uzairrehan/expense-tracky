"use client";

import { signupWithEmailPassword } from "@/firebase/firebaseauth";
import Link from "next/link";
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
                    <a href="#">
                        Signup
                    </a>
                    <div>
                        <div>
                            <h1>
                                Signup to your account
                            </h1>
                            <div>
                                <label htmlFor="name">Your name</label>
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
                                <label htmlFor="email">Your email</label>
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
                            <p>
                                Want to <Link href={"signin"}><b>signin ?</b></Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SignUp;
