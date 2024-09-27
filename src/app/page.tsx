"use client";

import Link from "next/link";

export default function Home() {
  return (
    <>
    <Link href={"/signin"}>signin</Link>
    <br />
    <Link href={"/signup"}>signup</Link>
    </>
  );
}
