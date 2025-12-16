import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnection } from "@/lib/dbConnection";
import AdminModel from "@/database/models/admin";
import { JWT } from "next-auth/jwt";
import type { NextAuthOptions } from "next-auth";

interface CustomJWT extends JWT {
    id?: string;
    document?: string;
    name?: string;
    email?: string;
    role?: string;
}

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt", 
    },

    providers: [
        CredentialsProvider({
            name: "credentials",

            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Contraseña", type: "password" },
            },

            async authorize(credentials) {

                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Faltan credenciales");
                }

                await dbConnection();
                const user = await AdminModel.findOne({ 
                    email: credentials.email,
                    role: "administrator"
                });

                if (!user) throw new Error("Solo administradores pueden acceder");

                if (credentials.password !== user.password) {
                    throw new Error("Contraseña incorrecta");
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {

            if (user) {
                const customUser = user as unknown as { id: string; name: string; email: string; role: string };
                (token as CustomJWT).id = customUser.id;
                (token as CustomJWT).name = customUser.name;
                (token as CustomJWT).email = customUser.email;
                (token as CustomJWT).role = customUser.role;
            }
            return token;
        },

        async session({ session, token }) {

            if (session.user) {
                const customToken = token as CustomJWT;
                (session.user as unknown as { id?: string; document?: string; name?: string; email?: string; role?: string }).id = customToken.id;
                (session.user as unknown as { id?: string; document?: string; name?: string; email?: string; role?: string }).name = customToken.name;
                (session.user as unknown as { id?: string; document?: string; name?: string; email?: string; role?: string }).email = customToken.email;
                (session.user as unknown as { id?: string; document?: string; name?: string; email?: string; role?: string }).role = customToken.role;
            }
            return session;
        },
    },

    pages: {
        signIn: "/",
    }
};