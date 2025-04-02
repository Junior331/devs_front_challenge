import { ReactNode } from "react";

export interface FormFieldProps {
  label: string;
  error?: string;
  htmlFor: string;
  className?: string;
  children: ReactNode;
}
