// lib/checkAdminAuth.ts
import { redirect } from "next/navigation";
import { getAdminFromSession } from "./adminSession";

export async function checkAdminAuth() {
  const admin = await getAdminFromSession();
  
  if (!admin || admin.role !== 'admin') {
    redirect("/admin/login");
  }
  
  return admin;
}