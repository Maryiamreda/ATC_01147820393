import 'dotenv/config';
import { eq } from 'drizzle-orm';
import * as schema from '../db/schema';
import * as bcrypt from 'bcrypt';
import * as validator from 'validator';
import  jwt from 'jsonwebtoken';
import { db } from '..';
import { NextApiRequest, NextApiResponse } from 'next';

type LoginCredentials = {
    email: string;
    password: string;
  };
 
const logInAdmin = async (credentials: LoginCredentials) => {

    try {
        if (credentials.email === process.env.ADMIN_EMAIL && credentials.password === process.env.ADMIN_PASSWORD) {
            // Generate JWT token
            // const token = jwt.sign(
            //     { email, password },
            //     process.env.JWT_SECRET,
            //     { expiresIn: '8h' }  // Add token expiration

            // );

            // // Return success response with token
            // res.json({
            //     success: true,
            //     token
            // });
        } else {
            // Return error for invalid credentials
 return { 
          success: false, 
          message: "Invalid credentials" 
        };        }
    }
    catch (err) {
       console.error("Error fetching user receipts:", err);
    throw err;
    }
}