import { Dispatch, SetStateAction  } from "react";

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



export type CategoryType = "Food" | "Transport" | "Bills" | "Education" | "Investments" | "Luxuries" | "Other";

export type UserType = {
  email: string;
  studentName: string;
  uid: string;
};
