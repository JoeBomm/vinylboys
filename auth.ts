import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import verifyLoginAndGetUserId from "@/src/utils/login"
import { signInSchema } from "@/src/lib/zod"
import { cookies } from "next/headers";
import { serialize } from "cookie";
import { saltAndHashPassword } from "./src/utils/password";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { type: "email", label: "Email", placeholder: "johndoe@gmail.com" },
        password: { type: "password", label: "Password", placeholder: "*****" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials);
          const userId = await verifyLoginAndGetUserId(email, password);
          if (!userId) return null;
                    
          return { 
            id: userId,
            role: "admin",//userId.role,
            groupId: "1"
          } 
        } catch (error) {
          return null;
        }
      },
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id,
        token.role = user.role,
        token.groupId = user.groupId
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.userId
      session.user.role = token.role
      session.user.groupId = token.groupId
      return session
    }
  }
});

// const setUserCookie = async () => {
//   const SEVEN_DAYS = 60 * 60 * 24 * 7;

//   (await cookies()).set('SomeCokie', serialize('tokenName', "token", {
//     httpOnly:true,
//     path: '/',
//     sameSite: 'lax',
//     maxAge: SEVEN_DAYS,
//   }))
// }
