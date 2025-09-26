import * as pwdUtils from "@/src/utils/password"
import { getUserCredentialsByEmail } from "./db";
import { User } from "next-auth";

export default async function verifyLoginAndGetUserInfo
  (candidateEmail: string, candidatePassword: string)
    : Promise<User | null> { 
  const userCreds = await getUserCredentialsByEmail(candidateEmail);
  if (!userCreds) return null;

  const isValid = await pwdUtils.verifyPassword(userCreds.hash, candidatePassword)

  
  return isValid 
    ? {
        id: userCreds.userId,
        role: null, // TODO: implement group roles
        groupId: userCreds.groupId
      } as User 
    : null
}