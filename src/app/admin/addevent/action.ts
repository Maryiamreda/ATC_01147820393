"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addEvent } from "../../../../backend/controllers/eventsController";
import ROUTES from "../../../../lib/routes";
// Define event input validation schema
const eventSchema = z.object({
  name: z.string().min(1, { message: "Event name is required" }),
  organizerEmail: z.string().email({ message: "Valid organizer email is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  fees: z.coerce.number().nonnegative({ message: "Fees must be a non-negative number" }),
  eventType: z.string().min(1, { message: "Event type is required" }),
  date: z.string().min(1, { message: "Event date is required" }),
  location: z.string().optional(),
  description: z.string().min(1, { message: "Description is required" }),
});

export type EventState = {
  errors?: {
    name?: string[];
    organizerEmail?: string[];
    category?: string[];
    fees?: string[];
    eventType?: string[];
    date?: string[];
    location?: string[];
    description?: string[];
    image?: string[];
    _form?: string[];
  };
  message?: string;
  success?: boolean;
};



export async function addEvent(prevState: EventState, formData: FormData): Promise<EventState> {
  try {
    
    const image = formData.get('image') as File;
    
    if (!image || image.size === 0) {
      return {
        errors: {
          image: ["Event image is required"],
        },
        success: false
      };
    }
console.log(formData);

    // Parse and validate form data
    const validationResult = eventSchema.safeParse({
      name: formData.get('name'),
      organizerEmail: formData.get('organizerEmail'),
      category: formData.get('category'),
      fees: formData.get('fees'),
      eventType: formData.get('eventType'),
      date: formData.get('date'),
      location: formData.get('location'),
      description: formData.get('description'),
    });

    if (!validationResult.success) {
      return {
        errors: validationResult.error.flatten().fieldErrors,
        success: false
      };
    }

    const data = validationResult.data;
    // Call the event controller to handle the database operations
    const result = await addEvent({
      ...data,
      image
    });

    if (!result.success) {
      return {
        errors: {
          organizerEmail: ["Failed to add event"],
        },
        success: false , 
        message: "Event added successfully!",
      };
    }
    redirect(ROUTES.ADMIN.DASHBOARD);
    
 
  } catch (err: any) {
    console.error("Error Adding Event", err);
    return {
      errors: {
        _form: [`Error adding event: ${err.message}`],
      },
      success: false
    };
  }
}