import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { JWT as DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: 'admin' | 'user'
      groupId: string
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    id: string
    role: 'admin' | 'user'
    groupId: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    userId: string
    groupId: string
    role: 'admin' | 'user'
  }
}
