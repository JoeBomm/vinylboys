'use server'

import { db } from "@/src/lib/db";
import { signupSchema } from "@/src/lib/zod";
import { saltAndHashPassword } from "@/src/utils/password";
import { Piazzolla } from "next/font/google";
import z, { success } from "zod";

interface ActionReturn {
  success: boolean,
  errors: Record<string, string[]>
}

export async function createAccount(formData: FormData): Promise<ActionReturn | undefined> {
  const parsed = signupSchema.safeParse({
    email: formData.get("email"),
    displayName: formData.get("displayName"),
    password: formData.get("password"),
  })

  if (!parsed.success) {
    const thing = parsed.error.flatten().fieldErrors  
    const tree = z.treeifyError(parsed.error);

    const errors: Record<string, string[]> = {};
    for (const [field, detail] of Object.entries(tree.properties ?? {})) {
      errors[field] = detail.errors;
    }

    return {
      success: false,
      errors,
    };  
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

  return {success: true, errors: {}}
}


