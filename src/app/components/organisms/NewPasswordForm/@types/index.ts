export interface NewPasswordFormProps {
  token: string;
}

export interface PasswordValidation {
  hasNumber: boolean;
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasSpecialChar: boolean;
}
export interface IValidationItem {
  isValid: boolean;
  text: string;
}
