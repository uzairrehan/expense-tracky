import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { saveUser } from "./firebasefirestore";
import { app } from "./firebaseconfig";

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export function signupWithEmailPassword(
email: string, password: string, studentName: string) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { email, uid} = userCredential.user;
      console.log(
        email,
        uid,
        studentName,
        "user created successfully."
      );

      updateProfile( userCredential.user, {
        displayName: studentName,
      })

      saveUser({ email: email as string, uid , studentName });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage, errorCode);
    });
}

export function loginWithEmailPassword(email: string, password: string) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const { email, uid } = userCredential.user;
      console.log(email, uid, "user LOGGED IN successfully.", userCredential);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage, errorCode);
    });
}

export function googleSign() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      console.log(token, user);
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credential);

      // ...
    });
}



export function signOutFunc() {
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log();
  }).catch((error) => {
    // An error happened
    console.log(error);
  });
}


export function passwordReset(email:string) {
  sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
    console.log("sent");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log(errorCode, errorMessage);
    
  });
}
