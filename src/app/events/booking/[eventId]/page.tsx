import React from 'react';
import { getUserFromSession } from '../../../../../lib/auth';
import { getEventById } from '../../../../../backend/controllers/eventsController';
import { useFormState } from 'react-dom';
import { bookEvent } from '../action';

type Props = {
  params: { eventId: string };
};
export default async function BookEvent({ params }: Props) {
          const [state, formAction] = useFormState(bookEvent, initialState);
    
       const event = await getEventById(params.eventId);
     
  return (
    <form >
      you are booking tickets for {event?.name} at {event?.location}, {event?.date}
      please specify the no of tickets you want 
      <input type='number'/>
      <button type='submit'>BOOK</button>
    </form>
  );
}

