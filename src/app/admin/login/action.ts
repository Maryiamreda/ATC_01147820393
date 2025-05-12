"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createAdminSession, deleteAdminSession } from "../../../../lib/adminSession";

// Schema for admin login validation
const adminLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).trim(),
});