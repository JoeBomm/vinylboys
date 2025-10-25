'use server'

import { db } from "@/src/lib/db";
import { signInSchema, signupSchema } from "@/src/lib/zod";
import { saltAndHashPassword } from "@/src/utils/password";
import z from "zod";

export interface CreateAccountResult {
  success: boolean
  errors?: {
    email?: string[]
    displayName?: string[]
    password?: string[]
    general?: string[]
  }
  values?: {
    email?: string
    displayName?: string
    password?: string
  },
  credentials?: {
    email: string;
    password: string;
  };
}

export interface LoginResult {
  success: boolean
  errors?: {
    email?: string[]
    password?: string[]
    general?: string[]
  }
}

export async function createAccount(
  prevState: CreateAccountResult | undefined,
  formData: FormData): Promise<CreateAccountResult | undefined> {
  const parsed = signupSchema.safeParse({
    email: formData.get("email"),
    displayName: formData.get("displayName"),
    password: formData.get("password"),
  })

  if (!parsed.success) {
    const tree = z.treeifyError(parsed.error);

    const errors: Record<string, string[]> = {};
    for (const [field, detail] of Object.entries(tree.properties ?? {})) {
      errors[field] = detail.errors;
    }

    return {
      success: false,
      errors,
      values: {
        email: String(formData.get("email") ?? ""),
        displayName: String(formData.get("displayName") ?? ""),
        password: String(formData.get("password") ?? ""),
      }
    };  
  }

  const { email, displayName, password} = parsed.data;

  const hash = await saltAndHashPassword(password);
  
  try {
  insertUserAndCreds(displayName, email, hash);

  return { 
    success: true, 
    credentials: {
      email: email,
      password: password
    } 
  };

  } catch (err: any) {
    if (err.code === "SQLITE_CONSTRAINT_UNIQUE" || err.message?.includes("UNIQUE")) {
      return {
        success: false,
        errors: { email: ["This email is already registered."] },
        values: {
        email: String(formData.get("email") ?? ""),
        displayName: String(formData.get("displayName") ?? ""),
        password: String(formData.get("password") ?? ""),
      },
      };
    }

    return {
      success: false,
      errors: { general: ["Something went wrong. Please try again later."] },
    };
  }
}

export async function validateLogin(formData: FormData): Promise<LoginResult> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!parsed.success) {
    const tree = z.treeifyError(parsed.error)
    const errors: Record<string, string[]> = {}

    for (const [field, detail] of Object.entries(tree.properties ?? {})) {
      errors[field] = detail.errors
    }

    return { success: false, errors }
  }

  return { success: true } // validation passed
}



const insertUserAndCreds = db.transaction((displayName: string, email: string, hash: string) => {
  const insertUser = db.prepare(`
    INSERT INTO [User] ([UserName]) VALUES(?)
  `);
  const insertUserResult = insertUser.run(displayName);
  const userId = insertUserResult.lastInsertRowid as number;

  const insertUserCreds = db.prepare(`
    INSERT INTO [UserCredentials] ([UserId], [Email], [Hash])
    VALUES (?, ?, ?)
  `);
  insertUserCreds.run(userId, email, hash);

  return;
});

