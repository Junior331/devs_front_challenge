import { Dispatch, SetStateAction } from "react";

export type LoginState = {
  message?: string;
  success: null | boolean;
};

export interface IAuthFormProps {
  pending: boolean;
  showPasswordToggle: boolean;
  onTabChange: Dispatch<SetStateAction<"login" | "signup" | "forgot">>;
  type: "login" | "signup" | "forgot";
  onSubmit: (formData: FormData) => void;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
  };
  token: string;
}

export interface AuthState {
  user: {
    id: string;
    email: string;
  } | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
