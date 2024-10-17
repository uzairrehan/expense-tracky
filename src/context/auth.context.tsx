"use client";

import { app } from "@/firebase/firebaseconfig";
import { AuthContextProviderType, AuthContextType, UserTypee } from "@/types/types";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({ children }: AuthContextProviderType) {
    const [user, setUser] = useState<UserTypee | null>(null);

    const route = useRouter();

    useEffect(() => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (loggedInUser) => {
            if (loggedInUser) {
                setUser(loggedInUser);
                route.push("/dashboard");
            }
            else {
                console.log('inside onauthstatechange else statement');
                setUser(null);
                route.push("/authenticate");
            }
        });
    }, [])

    return (
        <AuthContext.Provider value={{ user }} >
            {children}
        </AuthContext.Provider>
    )
}


export const useAuthContext = () => useContext(AuthContext); 