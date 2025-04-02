import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { authApi } from "@/app/lib/api/auth";
import { Input, Button } from "@/app/components/atoms";
import { FormField, AlertMessage } from "@/app/components/molecules";
import {
  resetPasswordSchema,
  ResetPasswordFormValues,
} from "@/app/lib/validations/auth";

export function ResetPasswordForm() {

  const [message, setMessage] = useState({
    show: false,
    type: "success",
    title: "Instruções Enviadas",
    message: "Instruções de recuperação de senha enviadas para seu email!",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (email: string) => authApi.resetPassword(email),
    onSuccess: () => {
      setMessage({
        show: true,
        type: "success",
        title: "Instruções Enviadas",
        message: "Instruções de recuperação de senha enviadas para seu email!",
      });
    },
    onError: (error: Error) => {
      setMessage({
        show: true,
        type: "error",
        title: "Error!",
        message: error.message || "Falha ao solicitar recuperação de senha.",
      });

      toast.error(error.message || "Falha ao solicitar recuperação de senha.");
    },
  });

  const onSubmit = (data: ResetPasswordFormValues) => {
    resetPasswordMutation.mutate(data.email);
  };

  return (
    <div className="flex max-w-[800px] w-full py-16 px-2 md:px-16 flex-col m-auto items-center gap-6 flex-shrink-0 rounded-[24px] border border-slate-300 bg-[rgba(250,250,250,0.75)] backdrop-blur-[4px]">
      {message.show ? (
        <AlertMessage
          type={message.type}
          title={message.title}
          message={message.message}
        />
      ) : (
        <>
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
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M33 16.5C33.5523 16.5 34 16.0523 34 15.5C34 14.9477 33.5523 14.5 33 14.5C32.4477 14.5 32 14.9477 32 15.5C32 16.0523 32.4477 16.5 33 16.5Z"
                  stroke="white"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-[#18181B] text-center font-[Segoe UI] text-[36px] font-semibold leading-normal">
              Recupere sua senha
            </h2>

            <p className="text-[#71717A] text-center font-[Segoe UI] text-[24px] font-normal leading-normal max-w-[500px]">
              Informe seu e-mail para receber as instruções de redefinição de
              senha.
            </p>
          </div>
          <div className="flex h-[1px] flex-col items-start self-stretch rounded-[200px] bg-[#D4D4D8]" />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full space-y-6 flex flex-col items-center gap-6"
          >
            <FormField
              label="E-mail da conta"
              htmlFor="email"
              error={errors.email?.message}
            >
              <Input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                className={`flex p-2 px-3 justify-between items-center self-stretch rounded-md border bg-white text-black font-['Segoe_UI'] text-[16px] font-normal leading-6`}
                placeholder="Digite o e-mail para recuperação"
                error={!!errors.email}
              />
            </FormField>

            <Button
              fullWidth
              type="submit"
              isLoading={resetPasswordMutation.isPending}
              className="flex items-center justify-center gap-2 py-4"
            >
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.27574 9.22361C7.14833 9.09643 6.99649 8.99636 6.82937 8.92945L1.5427 6.80945C1.47958 6.78412 1.42571 6.74009 1.38834 6.68327C1.35096 6.62645 1.33186 6.55955 1.33361 6.49156C1.33535 6.42357 1.35785 6.35774 1.39808 6.3029C1.43832 6.24806 1.49436 6.20685 1.5587 6.18479L14.2254 1.85145C14.2844 1.83012 14.3484 1.82604 14.4097 1.83971C14.471 1.85338 14.5271 1.88423 14.5715 1.92864C14.6159 1.97305 14.6468 2.02919 14.6604 2.09049C14.6741 2.15179 14.67 2.21571 14.6487 2.27479L10.3154 14.9415C10.2933 15.0058 10.2521 15.0618 10.1973 15.1021C10.1424 15.1423 10.0766 15.1648 10.0086 15.1665C9.9406 15.1683 9.87371 15.1492 9.81688 15.1118C9.76006 15.0744 9.71603 15.0206 9.6907 14.9575L7.5707 9.66945C7.50349 9.50245 7.40315 9.35079 7.27574 9.22361ZM7.27574 9.22361L14.5694 1.9314"
                  stroke="white"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Enviar instruções
            </Button>

            <div className="text-center">
              <a
                href="/auth/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Voltar para o login
              </a>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
