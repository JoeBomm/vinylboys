import { User } from "next-auth";
import { db } from "../lib/db";

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

export function getUserById(userId: string): User {
  const query = `
  SELECT
    u.[Id] AS [id]
    ,gm.[GroupId] AS [groupId]
    ,NULL AS [role]
FROM [User] u
JOIN [GroupMember] gm ON gm.[UserId] = u.[Id]
WHERE u.[Id] = ?`;

  const user = db.prepare(query).get(userId) as User;
  return user;
}