import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, updateProfile,sendPasswordResetEmail} from "firebase/auth";
import { saveUser } from "./firebasefirestore";
import { app } from "./firebaseconfig";
import { toast } from "@/hooks/use-toast";

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();




export function signupWithEmailPassword(email: string, password: string, studentName: string) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { email, uid} = userCredential.user;
      console.log(email, uid,studentName,"user created successfully.");
      updateProfile( userCredential.user, {
        displayName: studentName,
      })
      toast({
        title: "User Created",
        description: `Email is ${email} `,
      })
      saveUser({ email: email as string, uid , studentName });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage, errorCode);
      toast({
        variant: "destructive" ,
        title: "Cant Create User !",
        description: errorMessage,
      })
    });
}




export function loginWithEmailPassword(email: string, password: string) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { email, uid } = userCredential.user;
      console.log(email, uid, "user LOGGED IN successfully.", userCredential);
      toast({
        title: "Login Successfull",
        description: `Email is ${email} `,
      })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage, errorCode);
      toast({
        variant: "destructive" ,
        title: "Cant Login User !",
        description: errorMessage,
      })
    });
}




export function googleSign() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      console.log(token, user);
      toast({
        title: "Logged in from google",
      })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credential);
      toast({
        variant: "destructive" ,
        title: "Cant Continue with Google !",
        description: errorMessage,
      })
    });
}




export function signOutFunc() {
  signOut(auth).then(() => {
    console.log();
    toast({
      title: "Logged Out SuccesFully !",
    })
  }).catch((error) => {
    console.log(error);
    toast({
      variant: "destructive" ,
      title: "Cant Logout !",
      description: error,
    })
  });
}




export function passwordReset(email:string) {
  sendPasswordResetEmail(auth, email)
  .then(() => {
    console.log("sent");
    toast({
      title: "Email Sent successfully",
      description: `Check Inbox of ${email} `,
    })
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    toast({
      variant: "destructive" ,
      title: "Cant Send Email !",
      description: error,
    })
  });
}
 