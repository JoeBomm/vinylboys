import { db } from "../lib/db";
import { single } from "./collections";

export interface UserCredentials {
  userId: string,
  email: string,
  hash: string
}

export function getUserCredentialsByEmail(email: string): UserCredentials | null {
    const query = `
SELECT 
  UserId AS [userId]
  ,Email AS [email]
  ,Hash AS [hash]
FROM UserCredentials
WHERE Email = ?
    `;
  
    const userCreds = single(db.prepare(query).all(email) as UserCredentials[]);
    return userCreds
}