import { JWTPayload } from "jose";

export interface JwtPayload extends JWTPayload {
  userId: string;
  groupId: string | null | undefined
  role: 'admin' | 'user';
  exp?: number;
}

