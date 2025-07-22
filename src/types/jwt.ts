import { JWTPayload } from "jose";

export interface JwtPayload extends JWTPayload {
  userId: string;
  role: 'admin' | 'user';
  exp?: number;
}

