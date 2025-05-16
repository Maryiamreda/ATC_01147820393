import { revalidatePath } from "next/cache";
import { bookEventDB } from "../../../../backend/controllers/userControllers";
import { getUserFromSession } from "../../../../lib/auth";



export type BookingState = {
  errors?: {
    quantity?: string[];
    _form?: string[];
  };
  success?: boolean;
  bookingId?: number;
};

// Define the initial state
export const initialState: BookingState = {};

export async function bookEvent( userId:number , eventId:number , quantity: number ) {
  try {
 
    
    // Call the event controller to handle the database operations
    const result = await bookEventDB(eventId, userId , quantity);

    if (!result.success) {
      return {
        errors: {
          _form: [result.message || "Failed to update event"],
        },
        success: false
      };
    }
    
    
    
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