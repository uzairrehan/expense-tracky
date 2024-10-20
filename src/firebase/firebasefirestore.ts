import { addDoc, collection, deleteDoc,doc, getFirestore,setDoc, updateDoc,} from "firebase/firestore";
import { app } from "./firebaseconfig";
import { auth } from "./firebaseauth";
import { UserType } from "@/types/types";
import { toast } from "@/hooks/use-toast";

export const db = getFirestore(app);




export async function saveUser(user: UserType) {
  try {
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, user);
  } catch (e) {
    console.log(e);
  }
}



export async function saveExpense(title: string, amount: number, date: Date, category: string, note: string) {
  const uid = auth.currentUser?.uid;
  const collectionRef = collection(db, "expenses");
  try {
    const newExpense = { title, uid, amount, date, category, note };
    const docRef = await addDoc(collectionRef, newExpense);
    const docRefToUpdate = doc(db, "expenses", docRef.id);
    await updateDoc(docRefToUpdate, {
      firebaseID: docRef.id
    });
    toast({
      title: "Expense Saved !",
    })
  } catch (error) {
    console.log(error);
    toast({
      variant: "destructive" ,
      title: "Cant Save Expense !"
    })
  }
}



export async function deleteExpense(firebaseID: string) {
  await deleteDoc(doc(db, "expenses", firebaseID));
  console.log(firebaseID)
  toast({
    title: "Expense Deleted !",
  })
}















 