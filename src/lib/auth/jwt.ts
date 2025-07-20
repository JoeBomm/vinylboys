import { JwtPayload } from "@/types/jwt";
import { jwtVerify, SignJWT } from "jose";
import { jwtSecret } from "./secret";

/**
 * @param payload the payload to use to create the jwt token
 * @param expiresIn the time the jwt token will be valid
 * @returns jwt token: string
 */
export async function signJwt(payload: JwtPayload, expiresIn = '1h'): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(jwtSecret);
}

/**
 * @param token jwt token string to verify
 * @returns Verified payload: JwtPayload (or null if not verified)
 */
export async function verifyJwt(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, jwtSecret);
    return payload as JwtPayload;
  } catch (err) {
    console.error('JWT verification failed:', err);
    return null;
  }
}