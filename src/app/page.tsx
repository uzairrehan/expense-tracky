"use client";

import { googleSign } from "@/firebase/firebaseauth";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <Link href={"/signin"}>signin</Link>
    <br />
    <Link href={"/signup"}>signup</Link>
    <br />
    <button onClick={googleSign}>google sign</button>
    </>
  );
}
