import * as pwdUtils from "@/src/utils/password"
import { getUserCredentialsByEmail } from "./db";

export default async function verifyLoginAndGetUserId(candidateEmail: string, candidatePassword: string): Promise<string | null> { 
  const userCreds = await getUserCredentialsByEmail(candidateEmail);
  if (!userCreds) return null;

  const isValid = await pwdUtils.verifyPassword(userCreds.hash, candidatePassword)
  console.log("login valid", isValid)
  
  return isValid ? userCreds.userId : null
}