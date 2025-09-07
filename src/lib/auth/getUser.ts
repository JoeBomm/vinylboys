import { auth } from "@/auth";

export async function getUser() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  return session.user;
}
