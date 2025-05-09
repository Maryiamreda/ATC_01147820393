import { db } from "..";
import * as schema from '../db/schema';
import { eq } from 'drizzle-orm';

async function getEvents(){
    try{
        const events = await db.select()
        .from(schema.eventsTable);
        return events;
    
    }catch(err){
        console.error("Error fetching Events", err);
        throw err;
    }
 }


 async function addEvents(){
    try{
        const events = await db.select()
        .from(schema.eventsTable);
        return events;
    
    }catch(err){
        console.error("Error fetching Events", err);
        throw err;
    }
 }
  