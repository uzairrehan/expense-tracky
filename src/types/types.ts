import { Dispatch, SetStateAction } from "react";

export type userSaveType = {
  email: string | null;
  phoneNumber: string | null;
  uid: string;
};

export type todoDataType = {
  todo: string;
  uid: string;
  email: string;
  completed: boolean;
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
