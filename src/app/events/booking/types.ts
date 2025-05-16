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