"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createAdminSession, deleteAdminSession } from "../../../../lib/adminSession";

const adminLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).trim(),
});

export async function adminLogin(prevState: any, formData: FormData) {

  
  const result = adminLoginSchema.safeParse(Object.fromEntries(formData));
  
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;
 

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    console.log(email)
    await createAdminSession("admin-1", email);
    
    redirect("/admin/dashboard");
  } else {
    return {
      errors: {
        email: ["Invalid admin credentials"],
      },
    };
  }
}


export async function adminLogout() {
  await deleteAdminSession();
  redirect("/admin/login");
}