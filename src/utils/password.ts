import * as argon2 from "argon2";


export async function saltAndHashPassword(password: string): Promise<string> {
  return await argon2.hash(password);
}

export async function verifyPassword(hashToVerify: string | null, candidatePassword: string): Promise<boolean> {
  // dummy hash to prevent timing attacks for user login enumeration
  const dummyHash = '$argon2id$v=19$m=65536,t=2,p=1$AAAAAAAAAAAAAAAAAAAAAA$BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB';
  
  const nullResolvedHash = hashToVerify ? hashToVerify : dummyHash

  return await argon2.verify(nullResolvedHash, candidatePassword);
}