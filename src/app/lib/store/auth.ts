import { atom } from 'jotai';

interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const authAtom = atom<AuthState>({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
});