"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginState } from "@/app/auth/login/@types";
import { authenticate, getSession } from "@/app/auth/login/actions";
import { useUserSession } from "@/app/hooks/use-user-session";
import { loginSchema, LoginFormValues } from "@/app/lib/validations/auth";
import { useAtom } from "jotai";
import { authAtom } from "@/app/lib/store/auth";

const initialState: LoginState = {
  success: null,
  message: "",
};

export function LoginForm() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [auth, setAuth] = useAtom(authAtom);
  const { user, supabase } = useUserSession();
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction] = useFormState(authenticate, initialState);

  console.log(supabase);
  console.log(user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const getInfoSession = async () => {
    const session = await getSession();
    console.log("session ::", session);
    if (!session) return;
    
    setAuth({
      user: session?.user || null,
      token: session?.access_token || null,
      isLoading: false,
      isAuthenticated: true,
    });
  };

  // Efeito para lidar com o resultado da autenticação
  useEffect(() => {
    if (state.success === true) {
      toast.success(state.message || "Login realizado com sucesso!");

      getInfoSession();

      router.push("/welcome");
    } else if (state.success === false) {
      toast.error(
        state.message || "Falha ao fazer login. Verifique suas credenciais."
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, router, user]);

  useEffect(() => {
    getInfoSession();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, user]);

  const onSubmit = (data: LoginFormValues) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("authType", "login");

    formAction(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-zinc-900 font-['Segoe_UI'] text-[14px] font-normal leading-5"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email")}
          className={`flex p-2 px-3 justify-between items-center self-stretch rounded-md border bg-white text-black font-['Segoe_UI'] text-[16px] font-normal leading-6`}
          placeholder="Digite seu email"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="text-zinc-900 font-['Segoe_UI'] text-[14px] font-normal leading-5"
        >
          Senha
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            {...register("password")}
            className={`w-full flex p-2 px-3 justify-between items-center self-stretch rounded-md border bg-white text-black font-['Segoe_UI'] text-[16px] font-normal leading-6`}
            placeholder="Digite sua senha"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-zinc-400" />
            ) : (
              <Eye className="h-5 w-5 text-zinc-400" />
            )}
          </button>
        </div>
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mt-2">
        <div>
          <Link
            href="/auth/reset-password"
            className="text-zinc-500 font-['Segoe_UI'] text-[16px] font-normal hover:text-blue-500"
          >
            Esqueceu sua senha?
          </Link>
        </div>
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-blue-500 border-zinc-400 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 text-black font-['Segoe_UI'] text-[16px] font-normal cursor-pointer"
          >
            Manter conectado
          </label>
        </div>
      </div>

      <button
        type={
          state.success === null && state.message === "Authenticating..."
            ? "button"
            : "submit"
        }
        disabled={
          state.success === null && state.message === "Authenticating..."
        }
        className="flex cursor-pointer py-4 justify-center items-center gap-2.5 self-stretch rounded-lg bg-blue-500 text-white font-['Segoe_UI'] text-[16px] font-medium mt-4 hover:bg-blue-600 transition-colors"
      >
        {state.success === null && state.message === "Authenticating..." ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Entrando...
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 2.5H12.6667C13.0203 2.5 13.3594 2.64048 13.6095 2.89052C13.8595 3.14057 14 3.47971 14 3.83333V13.1667C14 13.5203 13.8595 13.8594 13.6095 14.1095C13.3594 14.3595 13.0203 14.5 12.6667 14.5H10M6.66667 11.8333L10 8.5M10 8.5L6.66667 5.16667M10 8.5H2"
                stroke="white"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Entrar
          </div>
        )}
      </button>
    </form>
  );
}
