"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";
import { createUser, userLogin } from '../../../backend/controllers/userControllers'

const testUser = {
    id: "1",
    email: "contact@cosdensolutions.io",
    password: "12345678",
  };
 
// Create a schema for account creation
const createAccountSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }).trim(),
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
  
});

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }).trim(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .trim(),
  });


  export async function login(prevState: any, formData: FormData) {
    const result=loginSchema.safeParse(Object.fromEntries(formData)); //converts formData into a regular object and checks if data matches the schema
    if (!result.success) {
        return {
          errors: result.error.flatten().fieldErrors,
        };
      }

      const { email, password } = result.data;
        let userId;

      

 try {
    // Use your createUser function from the controller
    const response = await userLogin({  email, password });

    if (!response.success) {
      // Return specific error messages from backend
      return {
        errors: {
          email: [response.message],
        },
      };
    }

   if (!response.data || !response.data.user || !response.data.user.id) {
      console.error("Unexpected response structure:", response);
      return {
        errors: {
          username: ["Server returned unexpected data. Please try again."],
        },
      };
    }

    // Get the user ID from the response
     userId = String(response.data.user.id);
    console.log(userId)
   
  } catch (error) {
    console.error("Error creating account:", error);
    return {
      errors: {
        username: ["Failed to create account. Please try again."],
      },
    };
  }


      await createSession(testUser.id);
      redirect("/mybookings")
  }



export async function createAccount(prevState: any, formData: FormData) {
  const result = createAccountSchema.safeParse(Object.fromEntries(formData));
  
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  
  const { username, email, password } = result.data;
  console.log(result.data)
  let userId;

  try {
    // Use your createUser function from the controller
    const response = await createUser({ username, email, password });

    if (!response.success) {
      // Return specific error messages from backend
      return {
        errors: {
          email: [response.message],
        },
      };
    }

   if (!response.data || !response.data.user || !response.data.user.id) {
      console.error("Unexpected response structure:", response);
      return {
        errors: {
          username: ["Server returned unexpected data. Please try again."],
        },
      };
    }

    // Get the user ID from the response
     userId = String(response.data.user.id);
    console.log(userId)
   
  } catch (error) {
    console.error("Error creating account:", error);
    return {
      errors: {
        username: ["Failed to create account. Please try again."],
      },
    };
  }


  // Create session for the new user 
  await createSession(userId);
    redirect("/dashboard");
}



  export async function logout() {
    await deleteSession();
  redirect("/login");
  }

