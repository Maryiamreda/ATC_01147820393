import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
const adminSecretKey = process.env.ADMIN_SECRET;
const encodedAdminKey = new TextEncoder().encode(adminSecretKey);

type AdminSessionPayload = {
    adminId: string;

  email: string;
  role: 'admin';
  expiresAt: Date;
};

export async function encrypt(payload: AdminSessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h") 
    .sign(encodedAdminKey);
}

export async function createAdminSession(     adminId: string, email: string) {
  const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000); 
    const session = await encrypt({ 
    adminId, 
    email, 
    role: 'admin', 
    expiresAt  }); //jwt token
    const cookieStore = await cookies();

    // @ts-ignore
    cookieStore.set("adminSession", session, {
      //Using HTTP-only cookies 
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      path: "/admin", // Only send this cookie for admin routes

    });
  }

  export async function deleteAdminSession() {
  // @ts-ignore
  cookies().delete("adminSession", { path: "/admin" });
}



export async function decryptAdminSession(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedAdminKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify admin session");
    return null;
  }
}
export async function getAdminFromSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("adminSession")?.value;
  if (!session) return null;
  const payload = await decryptAdminSession(session);
  if (!payload?.adminId || payload.role !== 'admin') return null;
  return { 
    adminId: payload.adminId, 
    email: payload.email,
    role: payload.role,
    payload 
  };
}