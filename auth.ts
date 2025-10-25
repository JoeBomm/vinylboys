import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import verifyLoginAndGetUserInfo from "@/src/utils/login"
import { signInSchema } from "@/src/lib/zod"
import { getUserById } from "./src/utils/db";
 
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
          const user = await verifyLoginAndGetUserInfo(email, password);
                    
          return user
        } catch (error) {
          // todo: implement persisted logging
          console.log("error: ", error)
          return null;
        }
      },
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.userId = user.id,
        token.role = user.role,
        token.groupId = user.groupId
      }

      if (trigger === "update") {
        const updatedUser = await getUserById(token.userId);
        token.groupId = updatedUser.groupId
        token.role = updatedUser.role
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