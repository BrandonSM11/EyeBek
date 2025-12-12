import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

//URL DEL BACKEND
const BACKEND_URL = "https://tu-backend-api.com"; 

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email y contraseña son requeridos");
        }

        try {
          //URL DEL BACKEND
          const response = await fetch(`${BACKEND_URL}/api/auth/login`, { 
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Credenciales inválidas");
          }

          // SEGÚN EL BACKEND
          if (data && data.user) {
            return {
              id: data.user.id,
              email: data.user.email,
              name: data.user.name,
              token: data.token, 
            };
          }

          return null;
        } catch (error: any) {
          throw new Error(error.message || "Error al iniciar sesión");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        // @ts-ignore
        token.accessToken = user.token; 
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        // @ts-ignore
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", 
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };