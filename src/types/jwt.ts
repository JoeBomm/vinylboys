import { JWTPayload } from "jose";

export interface JwtPayload extends JWTPayload {
  userId: number;
  role: 'admin' | 'user';
  exp?: number;
}

