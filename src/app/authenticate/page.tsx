// "use client";

// import SignIn from "@/components/signIn";
// import SignUp from "@/components/signUp";
// import { app } from "@/firebase/firebaseconfig";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// function Authenticate() {
//   const [pageState, setPageState] = useState("SignUp");
//   const route = useRouter();

//   useEffect(() => {
//     const auth = getAuth(app);
//     onAuthStateChanged(auth, (loggedInUser) => {
//       if (loggedInUser) {
//         route.push("/dashboard");
//       } else {
//         route.push("/authenticate");
//       }
//     });
//   }, [route]);

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       {pageState === "SignUp" ? (
//         <SignUp setPageState={setPageState} pageState={pageState} />
//       ) : (
//         <SignIn setPageState={setPageState} pageState={pageState} />
//       )}
//     </div>
//   );
// }

// export default Authenticate;



"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
// import { Icons } from "@/components/icons"

export default function AuthTabs() {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }

    return (
        <Tabs defaultValue="signin" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
                <form onSubmit={onSubmit}>
                    <div className="grid gap-2">
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="email">
                                Email
                            </Label>
                            <Input
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="text-center text-sm flex justify-end items-center">
                            <a href="#" className="underline">
                                Forgot password?
                            </a>
                        </div>
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="password">
                                Password
                            </Label>
                            <Input
                                id="password"
                                placeholder="Password"
                                type="password"
                                autoCapitalize="none"
                                autoComplete="current-password"
                                disabled={isLoading}
                            />
                        </div>
                        <Button disabled={isLoading}>
                            {/* {isLoading && ( */}
                            {/* // <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> */}
                            {/* //   )} */}
                            Sign In
                        </Button>
                    </div>
                </form>

            </TabsContent>
            <TabsContent value="signup">
                <form onSubmit={onSubmit}>
                    <div className="grid gap-2">
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="name">
                                Name
                            </Label>
                            <Input
                                id="name"
                                placeholder="name@example.com"
                                type="name"
                                autoCapitalize="none"
                                autoComplete="name"
                                autoCorrect="off"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="email">
                                Email
                            </Label>
                            <Input
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="password">
                                Password
                            </Label>
                            <Input
                                id="password"
                                placeholder="Password"
                                type="password"
                                autoCapitalize="none"
                                autoComplete="new-password"
                                disabled={isLoading}
                            />
                        </div>
                        <Button disabled={isLoading}>
                            {/* {isLoading && (
                // <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )} */}
                            Sign Up
                        </Button>
                    </div>
                </form>
            </TabsContent>
            <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <Button className="w-full" variant="outline" type="button" disabled={isLoading}>
                {/* {isLoading ? (
        //   <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
        //   <Icons.google className="mr-2 h-4 w-4" />
        )}{" "} */}
                Google
            </Button>
        </Tabs>
    )
}