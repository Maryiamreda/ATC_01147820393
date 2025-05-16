'use server';
import { bookEventDB } from "../../../../backend/controllers/userControllers";
import { getUserFromSession } from "../../../../lib/auth";
import { BookingState } from "./types"; // Import the type from separate file



export async function bookEvent(prevState: BookingState, formData: FormData) {
  try {
    const user = await getUserFromSession();

    if (!user) {
      return {
        errors: { _form: ["You must be logged in to book an event"] },
        success: false
      };
    }

    const quantityStr = formData.get("quantity");
    const eventIdStr = formData.get("eventId");

    const quantity = quantityStr ? parseInt(quantityStr.toString(), 10) : 1;
    const eventId = eventIdStr ? parseInt(eventIdStr.toString(), 10) : NaN;
    const userId = user.userId ? parseInt(user.userId.toString(), 10) : NaN;


    if (isNaN(quantity) || quantity < 1) {
      return {
        errors: { quantity: ["Please enter a valid quantity"] },
        success: false
      };
    }

    if (isNaN(eventId)) {
      return {
        errors: { _form: ["Invalid event ID"] },
        success: false
      };
    }

    const result = await bookEventDB(userId, eventId, quantity);

    return {
      success: true,
      bookingId: result.id
    };

  } catch (err: any) {
    console.error("Error booking event:", err);
    return {
      errors: { _form: [`Error booking event: ${err.message}`] },
      success: false
    };
  }
}
