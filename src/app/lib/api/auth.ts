import { QueryClient } from "@tanstack/react-query";
import { createClient } from "@/app/utils/supabase/client";

export const queryClient = new QueryClient();

interface LoginCredentials {
  email: string;
  password: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword(credentials);

    if (error) {
      throw new Error(error.message || "Failed to login");
    }

    return {
      token: data.session?.access_token,
      user: {
        id: data.user?.id || "",
        email: data.user?.email || "",
      },
    };
  },

  resetPassword: async (email: string): Promise<void> => {
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reset-password/confirm`
    });

    if (error) {
      throw new Error(error.message || "Failed to request password reset");
    }
  },

  updatePassword: async ({
    token,
    password,
  }: {
    token: string;
    password: string;
  }): Promise<void> => {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser(token);

    // // Verificação específica para token de recuperação
    const { error: authError } = await supabase.auth.verifyOtp({
      type: "recovery",
      token_hash: token,
    });

    if (authError) {
      throw new Error(authError.message || "Token inválido ou expirado");
    }

    const { error } = await supabase.auth.updateUser({
      email: user?.email,
      password,
    });

    if (error) {
      throw new Error(error.message || "Erro ao atualizar senha");
    }
  },

  validateSession: async (token: string): Promise<boolean> => {
    const supabase = createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    return !error && !!user;
  },
};
