import { createSecretKey } from "crypto";


const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

export const jwtSecret = createSecretKey(Buffer.from(secret));