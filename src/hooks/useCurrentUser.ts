'use client';

import { useSession } from 'next-auth/react';

interface CurrentUser {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
}

export const useCurrentUser = (): CurrentUser | null => {
  const { data: session } = useSession();
  
  if (!session?.user) return null;
  
  const user = session.user as unknown as CurrentUser;
  
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};