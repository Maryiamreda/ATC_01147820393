import { db } from "../index";
import * as schema from '../db/schema';
import { eq } from 'drizzle-orm';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export type EventType = 'in person' | 'online';

export type EventData = {
  name: string;
  organizerEmail: string;
  totalAudienceLimit: number;
  category: string;
  fees: number;
  eventType: string;
  date: string;
  location?: string;
  registrationDeadline?: string;
  description: string;
  image: File;
};




export async function addEventToDatabase(data: EventData) {
  try {
    // Validate required fields
    if (!data.name || !data.organizerEmail || !data.totalAudienceLimit || !data.category || 
        !data.fees || !data.eventType || !data.date || !data.description || !data.image) {
      return {
        success: false,
        message: "All fields are required",
      };
    }

    // Upload image to cloudinary
    const buffer = await data.image.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString('base64');
    const dataURI = `data:${data.image.type};base64,${base64Image}`;
    
    const imageUpload = await cloudinary.uploader.upload(dataURI, {
      resource_type: "image"
    });
    const imageUrl = imageUpload.secure_url;

    // Get eventType ID
    const eventTypeResult = await db.select()
      .from(schema.eventTypeTable)
.where(eq(schema.eventTypeTable.type, data.eventType.trim().toLowerCase() as any))
      .limit(1);
    
    if (eventTypeResult.length === 0) {
      return {
        success: false,
        message: "Invalid event type selected",
      };
    }

    const eventTypeId = eventTypeResult[0].id;

    // Get category ID
    const categoryResult = await db.select()
      .from(schema.eventCategoryTable)
      .where(eq(schema.eventCategoryTable.name, data.category as any))
      .limit(1);

    if (categoryResult.length === 0) {
      return {
        success: false,
        message: "Invalid category selected",
      };
    }

    const categoryId = categoryResult[0].id;

    // Insert the event into the database
    const newEvent = await db.insert(schema.eventsTable).values({
      name: data.name,
      image: imageUrl,
      fees: data.fees,
      description: data.description,
      date: new Date(data.date).toISOString(),
      location: data.location || "",
      totalAudienceLimit: data.totalAudienceLimit,
      registrationDeadline: data.registrationDeadline ? new Date(data.registrationDeadline) : null,
      eventTypeId: eventTypeId,
      categoryId: categoryId,
      organizerEmail: data.organizerEmail,
    }).returning();

    return {
      success: true,
      message: "Event Added successfully",
    };
  } catch (err: any) {
    console.error("Error Adding Event", err);
    return {
      success: false,
      message: `Error adding event: ${err.message}`,
    };
  }
}


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




 