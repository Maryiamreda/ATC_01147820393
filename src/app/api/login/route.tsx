// import { API_URL } from "@/constants";
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// // This route acts as a middleware between you and your backend server
// export async function POST(request: Request) {
//     const cookieStore = await cookies();
//     const formData = await request.formData();
//     const payload = Object.fromEntries(formData.entries());

//     try {
//         // login request to the original backend
//         const res = await fetch(API_URL + "/auth/login", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(payload)
//         });
//         const json = await res.json();

//         if (res.ok) {
//             cookieStore.set("token", json.data.token, {
//                 path: "/",
//                 expires: new Date(json.data.token_expires_at),
//                 // We can set the token as an httpOnly cookie
//                 // now because we are on the server
//                 httpOnly: true,
//                 sameSite: "lax",
//                 secure: process.env.NODE_ENV === "production"
//             });
//             // Optional: if your backend implements refresh token
//             cookieStore.set("refreshToken", data.data.refresh_token, {
//                 path: "/",
//                 expires: new Date(data.data.refresh_token_expires_at),
//                 httpOnly: true,
//                 sameSite: "lax",
//                 secure: process.env.NODE_ENV === "production"
//             });
//         }

//         // Return the same response as the external backend.
//         return NextResponse.json(data, { status: res.status });
//     } catch (err) {
//         console.log("Error logging in:", err);
//         return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
//     }
// }