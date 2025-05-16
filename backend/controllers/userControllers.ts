import 'dotenv/config';
import { eq } from 'drizzle-orm';
import * as schema from '../db/schema';
import * as bcrypt from 'bcrypt';
import * as validator from 'validator';
import  jwt from 'jsonwebtoken';
import { db } from '..';
import { NextApiRequest, NextApiResponse } from 'next';

type UserData ={
 username: string;
  email: string;
  password: string;
}
// Login credentials type
type LoginCredentials = {
    email: string;
    password: string;
  };
 



export async function getallUsers() {
   try{
          const users = await db.select()
          .from(schema.usersTable);
          return users;
      
      }catch(err){
          console.error("Error fetching Events", err);
          throw err;
      }
}
export async function bookEvent(userId:number , eventId:number , quantity: number) {
  try{
    const booking = await db.insert(schema.bookingsTable)
      .values({
        userId: userId,
        eventId: eventId,
        quantity: quantity,
      })
      .returning();
    
    return booking[0];
  }catch(err:any){
     console.error("Error Booking Event", err);
        throw err;
  }
}
//create user account 
export async function createUser(userData:UserData) {
    try{
        if (!userData.username || !userData.email  || !userData.password) {
            throw new Error("Missing required user information");
          }
          if (!validator.isEmail(userData.email)) {
            return { success: false, message: "Enter A Valid Email" }
        }
        if (userData.password.length < 8) {
            return { success: false, message: "Enter Strong Password" }

        }

console.log(userData);
        const existingUsers= await db.select()
        .from(schema.usersTable).where(eq(schema.usersTable.email, userData.email));
        if(existingUsers.length > 0){
            return { success: false, message: "This Email already exists! " }

        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        // await db.insert(usersTable).values(user);


        const newUser = await db.insert(schema.usersTable)
        .values({
          username: userData.username,
          email: userData.email,
          password: hashedPassword
        }).returning();


        const token = jwt.sign({ userId: newUser[0].id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

        return {
            success: true,
            message: "User created successfully",
            data: {

      user: {
          id: newUser[0].id,
          username: newUser[0].username,
          email: newUser[0].email
        }, token
            }
        }
    }catch(err){
        console.error("Error creating account", err);
        throw err;
    }
    }



export async function userLogin(credentials: LoginCredentials , 
  res?: NextApiResponse
) {
  try{
    const { email, password } = credentials;
    if (!email || !password) {
        return { success: false, message: "Email and password are required" };
      }
  
      const users = await db.select()
      .from(schema.usersTable)
      .where(eq(schema.usersTable.email, email));
    
    if (users.length === 0) {
      return { 
        success: false, 
        message: "User doesn't exist" 
      };
    }

    const user = users[0];

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password!);
    if (!isMatch) {
        return { 
          success: false, 
          message: "Invalid email or password" 
        };
      }
      const token = jwt.sign(
        { userId: user.id }, 
        process.env.JWT_SECRET!, 
        { expiresIn: '1d' }
      );
      
      return { 
        success: true, 
        message: "Login successful",
        data: {
          user: {id: user.id,
                    email: user.email}
,
          token
        }, 
    };
   
}
catch(err){
    console.error("Error logging in", err);
    throw err;
}
    }

 