import { Dispatch, ReactNode, SetStateAction } from "react";

export type userSaveType = {
  email: string | null;
  phoneNumber: string | null;
  uid: string;
};

export type inputElementType = {
  e: React.ChangeEvent<HTMLInputElement>;
};

export type authContextType = {
  authenticatedUser: {
    email: string;
    uid: string;
  };
  setAuthenticatedUser: Dispatch<SetStateAction<object>>;
};

export type CategoryType =
  | "Food"
  | "Transport"
  | "Bills"
  | "Education"
  | "Investments"
  | "Luxuries"
  | "Other";

export type UserType = {
  email: string;
  studentName: string;
  uid: string;
};

export type UserTypee = {
  email: string | null;
  uid: string;
  photoURL: string | null;
};

export type AuthContextProviderType = {
  children: ReactNode;
};

export type AuthContextType = {
  user: UserTypee | null;
};

export type ExpenseType = {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: Date;
  note: string;
  firebaseID: string;
};

export type setStateType = {
  setPageState: (pageState: string) => void;
  pageState: string;
};
