import { db } from "../lib/db";
import { single } from "./collections";

export interface UserCredentials {
  userId: string,
  email: string,
  hash: string,
  groupId: string
}

export function getUserCredentialsByEmail(email: string): UserCredentials | null {
    const query = `
SELECT 
  u.[UserId] AS [userId]
  ,u.[Email] AS [email]
  ,u.[Hash] AS [hash]
  ,gm.[GroupId] AS [groupId]
FROM [UserCredentials] u
LEFT JOIN [GroupMember] gm ON gm.[UserID] = u.[UserId]
WHERE u.[Email] = ?`;
  
    const userCreds = db.prepare(query).get(email) as UserCredentials;
    return userCreds
}