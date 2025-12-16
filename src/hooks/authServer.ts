import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";



interface CurrentUser {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
}

export async function getCurrentUserServer() {
  const session = await getServerSession(authOptions);

  if (!session?.user) return null;

  const user = session.user as unknown as CurrentUser;


  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};