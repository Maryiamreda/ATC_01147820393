"use client"

import React from 'react';

import { useFormState } from 'react-dom';
import { bookEvent } from '../action';
import { initialState } from '../types';

export default  function Form({ event }: { event: any }) {
const [state, formAction] = useFormState(bookEvent, initialState);

     
  return (
    <form action={formAction} >
      you are booking tickets for {event?.name} at {event?.location}, {event?.date}
      please specify the no of tickets you want 
      <input type='number' name='quantity' min={1} defaultValue={1}/>
            <input type="hidden" name="eventId" value={event.id} />

      <button type='submit'>BOOK</button>
       {state.errors?._form && <p>{state.errors._form.join(", ")}</p>}
      {state.success && <p>Booking successful!</p>}
    </form>
  );
}

