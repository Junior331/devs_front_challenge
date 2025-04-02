import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

type SupabaseServerClientOptions = {
  context?:
    | GetServerSidePropsContext
    | { req: NextApiRequest; res: NextApiResponse };
};

export async function createClient(options?: SupabaseServerClientOptions) {
  if (options?.context) {
    const { req, res } = options.context;

    return createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name) {
            return req.cookies[name];
          },
          set(name, value, options) {
            res.setHeader(
              "Set-Cookie",
              `${name}=${value}; Path=/; ${
                options?.httpOnly ? "HttpOnly;" : ""
              } ${options?.secure ? "Secure;" : ""} ${
                options?.maxAge ? `Max-Age=${options.maxAge};` : ""
              }`
            );
          },
          remove(name, options) {
            res.setHeader(
              "Set-Cookie",
              `${name}=; Path=/; ${options?.httpOnly ? "HttpOnly;" : ""} ${
                options?.secure ? "Secure;" : ""
              } Max-Age=0;`
            );
          },
        },
      }
    );
  }

  // Usar cookies() do Next.js quando não há contexto
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,
      },
      cookies: {
        async get(name) {
          return (await cookieStore).get(name)?.value;
        },
        async set(name, value, options) {
          try {
            (await cookieStore).set(name, value, options);
          } catch {
            // Ignora erros ao definir cookies em componentes do servidor
          }
        },
        async remove(name, options) {
          try {
            (await cookieStore).set(name, "", { ...options, maxAge: 0 });
          } catch {
            // Ignora erros ao remover cookies em componentes do servidor
          }
        },
      },
    }
  );
}
