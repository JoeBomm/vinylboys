'use server'

import { db } from "@/src/lib/db";
import { signupSchema } from "@/src/lib/zod";
import { saltAndHashPassword } from "@/src/utils/password";
import { Piazzolla } from "next/font/google";
import z, { success } from "zod";

export const  createAccount = async (formData: FormData) => {
  const parsed = signupSchema.safeParse({
    email: formData.get("email"),
    displayName: formData.get("displayName"),
    password: formData.get("password"),
  })

  if (!parsed.success) {
    return {
      success: false,
      errors: z.treeifyError(parsed.error)
    }
  }

  const { email, displayName, password} = parsed.data;

  const hash = await saltAndHashPassword(password);
  
  const insertUser = db.prepare(`
INSERT INTO [User] ([UserName]) VALUES(?)`);

  const insertUserResult = insertUser.run(displayName)
  const userId = insertUserResult.lastInsertRowid as number;

  const insertUserCreds = db.prepare(`
INSERT INTO [UserCredentials] ([UserId], [Email], [Hash])
VALUES (?, ?, ?)`);

  insertUserCreds.run(userId, email, hash);
}


