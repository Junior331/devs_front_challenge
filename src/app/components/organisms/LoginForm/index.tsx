import { useAtom } from "jotai";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { authApi } from "@/app/lib/api/auth";
import { authAtom } from "@/app/lib/store/auth";
import { loginSchema, LoginFormValues } from "@/app/lib/validations/auth";

export function LoginForm() {
  const router = useRouter();
  const [auth, setAuth] = useAtom(authAtom);
  const [showPassword, setShowPassword] = useState(false);

  console.log(auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: async (data) => {
      setAuth({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      });

      try {
        await authApi.validateSession(data.token);
        toast.success("Login realizado com sucesso!");
        router.push("/welcome");
      } catch {
        toast.error("Sessão inválida. Por favor, faça login novamente.");
        setAuth({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    },
    onError: (error: Error) => {
      toast.error(
        error.message || "Falha ao fazer login. Verifique suas credenciais."
      );
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
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
          className={`flex p-2 px-3 justify-between items-center self-stretch rounded-md border bg-white text-zinc-400 font-['Segoe_UI'] text-[16px] font-normal leading-6`}
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
            className={`w-full flex p-2 px-3 justify-between items-center self-stretch rounded-md border bg-white text-zinc-400 font-['Segoe_UI'] text-[16px] font-normal leading-6`}
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
          <a
            href="/auth/reset-password"
            className="text-zinc-500 font-['Segoe_UI'] text-[16px] font-normal hover:text-blue-500"
          >
            Esqueceu sua senha?
          </a>
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
        type={loginMutation.isPending ? "button" : "submit"}
        disabled={loginMutation.isPending}
        className="flex p-5 justify-center items-center gap-2.5 self-stretch rounded-lg bg-blue-500 text-white font-['Segoe_UI'] text-[16px] font-medium mt-4 hover:bg-blue-600 transition-colors"
      >
        {loginMutation.isPending ? (
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
          "Entrar"
        )}
      </button>
    </form>
  );
}
