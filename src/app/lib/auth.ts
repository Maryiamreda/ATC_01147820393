import { cookies } from "next/headers";
import { decrypt } from "./session";


export async function getUserFromSession() {
  const cookieStore = await cookies();
  const session =  cookieStore.get("session")?.value;
  if (!session) return null;
  const payload = await decrypt(session);
  return payload?.userId ? payload : null;
}