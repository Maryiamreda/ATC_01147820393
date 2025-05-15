"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { editEventDB } from "../../../../backend/controllers/eventsController";
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




export async function editEvent(prevState: EventState, formData: FormData, eventId: string): Promise<EventState> {
  try {
    // Parse the eventId to a number for database operations
    const eventIdNumber = parseInt(eventId, 10);
    
    if (isNaN(eventIdNumber)) {
      return {
        errors: {
          _form: ["Invalid event ID"],
        },
        success: false
      };
    }

    // Get image from form data
    const image = formData.get('image') as File;
    const hasNewImage = image && image.size > 0 && image.name !== 'undefined';
    
    // Parse and validate form data
    const validationResult = eventSchema.safeParse({
      name: formData.get('name'),
      organizerEmail: formData.get('organizerEmail'),
      category: formData.get('category'),
      fees: formData.get('fees'),
      eventType: formData.get('eventType'),
      date: formData.get('date'),
      location: formData.get('location') || "",
      description: formData.get('description'),
    });

    if (!validationResult.success) {
      return {
        errors: validationResult.error.flatten().fieldErrors,
        success: false
      };
    }

    // Prepare data for update - match the EventData type expected by your controller
    const updateData = {
      name: validationResult.data.name,
      organizerEmail: validationResult.data.organizerEmail,
      category: validationResult.data.category,
      fees: validationResult.data.fees,
      eventType: validationResult.data.eventType,
      date: validationResult.data.date,
      location: validationResult.data.location,
      description: validationResult.data.description,
      // Only include image if a new one was provided
      ...(hasNewImage ? { image } : {})
    };
console.log(updateData)
    // Call the event controller to handle the database operations
    const result = await editEventDB(eventIdNumber, updateData);

    if (!result.success) {
      return {
        errors: {
          _form: [result.message || "Failed to update event"],
        },
        success: false
      };
    }
    
    // Revalidate the paths to refresh data
    revalidatePath(ROUTES.ADMIN.DASHBOARD);
    revalidatePath(`/events/${eventId}`);
    
    // Redirect to dashboard upon successful update
    redirect(ROUTES.ADMIN.DASHBOARD);
    
  } catch (err: any) {
    console.error("Error updating event:", err);
    return {
      errors: {
        _form: [`Error updating event: ${err.message}`],
      },
      success: false
    };
  }
}