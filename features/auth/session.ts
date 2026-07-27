import { getSession } from "@/lib/auth/server";

export async function getCurrentSession() {
  return getSession();
}

export async function requireUser() {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return session.user;
}