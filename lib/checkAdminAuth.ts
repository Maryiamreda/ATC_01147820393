// lib/checkAdminAuth.ts
import { redirect } from "next/navigation";
import { getAdminFromSession } from "./adminSession";
import ROUTES from "./routes";
export async function checkAdminAuth() {
  const admin = await getAdminFromSession();
  
  if (!admin || admin.role !== 'admin') {
    redirect(ROUTES.ADMIN.LOGIN);
  }
  
  return admin;
}