"use server";

import { LoginState } from "./@types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/app/utils/supabase/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleAuthError = (error: any): LoginState => ({
  success: false,
  message: error.message || "Authentication failed",
});

export async function authenticate(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const supabase = await createClient();
  const authType = formData.get("authType") as string;

  try {
    if (authType === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });


      if (error) {
        return handleAuthError(error);
      } else {
        return { success: true, message: "Login successful!" };
      }
    }

    if (authType === "signup") {
      const { error } = await supabase.auth.signUp({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });
      return error
        ? handleAuthError(error)
        : { success: true, message: "Check your email to confirm signup!" };
    }

    if (authType === "forgot") {
      return await sendPasswordReset(formData);
    }

    return handleAuthError(new Error("Invalid authentication type"));
  } catch (error) {
    return handleAuthError(error);
  }
}

export async function sendPasswordReset(
  formData: FormData
): Promise<LoginState> {
  const supabase = await createClient();
  const email = formData.get("email") as string;

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reset-password/confirm`
    });
    return error
      ? handleAuthError(error)
      : { success: true, message: "Password reset link sent!" };
  } catch (error) {
    return handleAuthError(error);
  }
}

export async function logout() {
  const cookieStore = await cookies();
  const supabase = await createClient();

  await supabase.auth.signOut();

  // Limpar cookies relacionados à autenticação
  cookieStore.delete("supabase-auth-token");

  redirect("/auth/login");
}

// actions.ts
export async function getSession() {
  const supabase = await createClient();
  
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) throw error;
    
    return {
      user: session?.user || null,
      access_token: session?.access_token || null,
      isAuthenticated: !!session
    };
  } catch (error) {
    console.error("Error getting session:", error);
    return {
      user: null,
      access_token: null,
      isAuthenticated: false
    };
  }
}