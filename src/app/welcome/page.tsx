'use client';

import { useAtom } from 'jotai';
import { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/atoms';
import { authAtom } from '@/app/lib/store/auth';

export default function WelcomePage() {
  const router = useRouter();
  const [auth, setAuth] = useAtom(authAtom);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.push('/auth/login');
    }
  }, [auth.isAuthenticated, router]);

  const handleLogout = () => {
    setAuth({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
    });
    router.push('/auth/login');
  };

  if (!auth.isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Bem-vindo(a)!
        </h1>
        <p className="text-lg text-gray-600">
          Você está logado como {auth.user?.email}
        </p>
        <Button onClick={handleLogout} variant="outline">
          Sair
        </Button>
      </div>
    </div>
  );
}