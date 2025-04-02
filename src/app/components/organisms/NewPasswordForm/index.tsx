import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { authApi } from "@/app/lib/api/auth";
import { Button } from "@/app/components/atoms";
import { FormField, PasswordInput } from "@/app/components/molecules";
import {
  newPasswordSchema,
  NewPasswordFormValues,
} from "@/app/lib/validations/auth";
import {
  IValidationItem,
  PasswordValidation,
  NewPasswordFormProps,
} from "./@types";

export function NewPasswordForm({ token }: NewPasswordFormProps) {
  const router = useRouter();
  const [passwordValidation, setPasswordValidation] =
    useState<PasswordValidation>({
      minLength: false,
      hasUppercase: false,
      hasLowercase: false,
      hasNumber: false,
      hasSpecialChar: false,
    });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewPasswordFormValues>({
    resolver: zodResolver(newPasswordSchema),
  });

  const password = watch("password", "");

  useEffect(() => {
    setPasswordValidation({
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[^A-Za-z0-9]/.test(password),
    });
  }, [password]);

  const updatePasswordMutation = useMutation({
    mutationFn: (password: string) =>
      authApi.updatePassword({ token, password }),
    onSuccess: () => {
      toast.success("Senha atualizada com sucesso!");
      router.push("/auth/login");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Falha ao atualizar senha.");
    },
  });

  const onSubmit = (data: NewPasswordFormValues) => {
    updatePasswordMutation.mutate(data.password);
  };

  const ValidationItem = ({ isValid, text }: IValidationItem) => (
    <div className="flex w-fit items-center gap-2">
      <div
        className={`w-4 h-4 rounded-full flex items-center justify-center ${
          isValid ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        {isValid && (
          <svg
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 3.5L3.5 6L9 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span className="text-sm text-gray-600">{text}</span>
    </div>
  );

  return (
    <div className="flex max-w-[800px] w-full py-16 px-2 md:px-16 flex-col m-auto items-center gap-6 flex-shrink-0 rounded-[24px] border border-slate-300 bg-[rgba(250,250,250,0.75)] backdrop-blur-[4px]">
      <div className="flex items-center flex-col m-auto ">
        <div className="flex w-[100px] h-[100px] flex-col justify-center items-center aspect-square rounded-full bg-black">
          <svg
            width="48"
            height="49"
            viewBox="0 0 48 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M33 16.5C33.5523 16.5 34 16.0523 34 15.5C34 14.9477 33.5523 14.5 33 14.5C32.4477 14.5 32 14.9477 32 15.5C32 16.0523 32.4477 16.5 33 16.5Z"
              fill="black"
            />
            <path
              d="M5.172 35.3278C4.4218 36.0778 4.00023 37.0951 4 38.1558V42.4998C4 43.0303 4.21071 43.539 4.58579 43.914C4.96086 44.2891 5.46957 44.4998 6 44.4998H12C12.5304 44.4998 13.0391 44.2891 13.4142 43.914C13.7893 43.539 14 43.0303 14 42.4998V40.4998C14 39.9694 14.2107 39.4607 14.5858 39.0856C14.9609 38.7105 15.4696 38.4998 16 38.4998H18C18.5304 38.4998 19.0391 38.2891 19.4142 37.914C19.7893 37.539 20 37.0303 20 36.4998V34.4998C20 33.9694 20.2107 33.4607 20.5858 33.0856C20.9609 32.7105 21.4696 32.4998 22 32.4998H22.344C23.4048 32.4996 24.422 32.078 25.172 31.3278L26.8 29.6998C29.5797 30.6681 32.6057 30.6644 35.383 29.6893C38.1603 28.7142 40.5244 26.8255 42.0887 24.3321C43.653 21.8387 44.3248 18.8882 43.9942 15.9633C43.6636 13.0384 42.3502 10.3123 40.2689 8.23097C38.1875 6.14961 35.4614 4.8362 32.5365 4.50561C29.6117 4.17502 26.6612 4.84682 24.1677 6.41111C21.6743 7.97541 19.7856 10.3396 18.8105 13.1169C17.8354 15.8942 17.8317 18.9202 18.8 21.6998L5.172 35.3278Z"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M33 16.5C33.5523 16.5 34 16.0523 34 15.5C34 14.9477 33.5523 14.5 33 14.5C32.4477 14.5 32 14.9477 32 15.5C32 16.0523 32.4477 16.5 33 16.5Z"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="text-[#18181B] text-center font-[Segoe UI] text-[36px] font-semibold leading-normal">
          Redefina sua senha
        </h2>

        <p className="text-[#71717A] text-center font-[Segoe UI] text-[24px] font-normal leading-normal max-w-[410px]">
          Digite sua nova senha para recuperar o acesso à sua conta.
        </p>
      </div>
      <div className="flex h-[1px] flex-col items-start self-stretch rounded-[200px] bg-[#D4D4D8]" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center gap-6"
      >
        <div className="w-full flex flex-col items-center gap-2">
          <FormField label="Nova senha" htmlFor="password" className="mb-1">
            <PasswordInput
              id="password"
              autoComplete="password"
              {...register("password")}
              className={`flex p-2 px-3 justify-between items-center self-stretch rounded-md border bg-white text-black font-['Segoe_UI'] text-[16px] font-normal leading-6`}
              placeholder="Digite a nova senha"
              error={!!errors.password}
            />
          </FormField>

          {password.length > 0 && (
            <div className="flex flex-wrap gap-2 w-full mb-2">
              <ValidationItem
                isValid={passwordValidation.minLength}
                text="Mínimo de 8 caracteres"
              />
              <ValidationItem
                isValid={passwordValidation.hasUppercase}
                text="Letra maiúscula"
              />
              <ValidationItem
                isValid={passwordValidation.hasLowercase}
                text="Letra minúscula"
              />
              <ValidationItem
                isValid={passwordValidation.hasNumber}
                text="Número"
              />
              <ValidationItem
                isValid={passwordValidation.hasSpecialChar}
                text="Caractere especial"
              />
            </div>
          )}
        </div>

        <FormField
          htmlFor="confirmPassword"
          label="Confirme a nova senha"
          error={errors.confirmPassword?.message}
        >
          <PasswordInput
            id="confirmPassword"
            className={`flex p-2 px-3 justify-between items-center self-stretch rounded-md border bg-white text-black font-['Segoe_UI'] text-[16px] font-normal leading-6`}
            autoComplete="confirm-password"
            placeholder="Digite a senha novamente"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
          />
        </FormField>

        <Button
          fullWidth
          type="submit"
          className="flex items-center justify-center gap-2 py-4"
          isLoading={updatePasswordMutation.isPending}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.4999 5.83342C11.684 5.83342 11.8333 5.68418 11.8333 5.50008C11.8333 5.31599 11.684 5.16675 11.4999 5.16675C11.3158 5.16675 11.1666 5.31599 11.1666 5.50008C11.1666 5.68418 11.3158 5.83342 11.4999 5.83342Z"
              fill="black"
            />
            <path
              d="M2.22392 12.1094C1.97385 12.3593 1.83333 12.6984 1.83325 13.052V14.5C1.83325 14.6768 1.90349 14.8464 2.02851 14.9714C2.15354 15.0965 2.32311 15.1667 2.49992 15.1667H4.49992C4.67673 15.1667 4.8463 15.0965 4.97132 14.9714C5.09635 14.8464 5.16659 14.6768 5.16659 14.5V13.8334C5.16659 13.6565 5.23682 13.487 5.36185 13.362C5.48687 13.2369 5.65644 13.1667 5.83325 13.1667H6.49992C6.67673 13.1667 6.8463 13.0965 6.97132 12.9714C7.09635 12.8464 7.16659 12.6768 7.16659 12.5V11.8334C7.16659 11.6565 7.23682 11.487 7.36185 11.362C7.48687 11.2369 7.65644 11.1667 7.83325 11.1667H7.94792C8.30151 11.1666 8.6406 11.0261 8.89059 10.776L9.43325 10.2334C10.3598 10.5561 11.3685 10.5549 12.2942 10.2299C13.22 9.90483 14.0081 9.27525 14.5295 8.44411C15.0509 7.61297 15.2749 6.62947 15.1647 5.65452C15.0545 4.67956 14.6167 3.77086 13.9229 3.07707C13.2291 2.38328 12.3204 1.94548 11.3454 1.83528C10.3705 1.72509 9.38698 1.94902 8.55584 2.47045C7.72469 2.99188 7.09511 3.77994 6.77008 4.70571C6.44506 5.63147 6.44382 6.64014 6.76659 7.56669L2.22392 12.1094Z"
              stroke="white"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.4999 5.83342C11.684 5.83342 11.8333 5.68418 11.8333 5.50008C11.8333 5.31599 11.684 5.16675 11.4999 5.16675C11.3158 5.16675 11.1666 5.31599 11.1666 5.50008C11.1666 5.68418 11.3158 5.83342 11.4999 5.83342Z"
              stroke="white"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Atualizar senha
        </Button>
      </form>
    </div>
  );
}
