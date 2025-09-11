import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { JWT as DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: 'admin' | 'user' | null
      groupId: string | null
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    id: string
    role: 'admin' | 'user' | null
    groupId: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    userId: string
    groupId: string | null
    role: 'admin' | 'user' | null
  }
}
