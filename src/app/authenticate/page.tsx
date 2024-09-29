"use client";

import SignIn from "@/components/signIn";
import SignUp from "@/components/signUp";
import { googleSign } from "@/firebase/firebaseauth";


function Authenticate() {
    return ( 
        <>
        <SignIn />
        <SignUp />
        <button onClick={googleSign}>Google Signin</button>
        </>
     );
}

export default Authenticate;