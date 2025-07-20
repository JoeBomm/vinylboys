import { beforeAll, describe, expect, test } from 'vitest'
import { JwtPayload } from "@/types/jwt";
import { signJwt, verifyJwt } from "./jwt";

describe('JWT utils', () => {
  beforeAll(() => {
    process.env.JWT_SECRET = 'test_secret';
  })
  
  test('sign and verify jwt', async () => {
    const payload : JwtPayload = { userId: 123, role: 'user'};
    const token = await signJwt(payload);

    expect(typeof token).toBe('string');

    const verifiedPayload = await verifyJwt(token);
    
    expect(verifiedPayload?.userId).toBe(123);
    expect(verifiedPayload?.role).toBe('user');
  })

  test('verifyJwt returns null for invalid token', async () => {
    const result = await verifyJwt('invalid.token.here');
    expect(result).toBeNull();
  })
})