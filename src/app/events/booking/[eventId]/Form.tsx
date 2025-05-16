"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { useFormState } from 'react-dom';
import { bookEvent } from '../action';
import { initialState } from '../types';
import Link from 'next/link';
import ROUTES from '../../../../../lib/routes';

export default  function Form({ event }: { event: any }) {
const [state, formAction] = useFormState(bookEvent, initialState);
 const [showModal, setShowModal] = useState(false);

  // Watch for booking success
  useEffect(() => {
    if (state.success) {
      setShowModal(true);
    }
  }, [state.success]);

     
  return (
    <>
    <form action={formAction} >
      you are booking tickets for {event?.name} at {event?.location}, {event?.date}
      please specify the no of tickets you want 
      <input type='number' name='quantity' min={1} defaultValue={1}/>
            <input type="hidden" name="eventId" value={event.id} />

      <button type='submit'>BOOK</button>
      
    </form>
     {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md text-center w-[90%] max-w-sm">
            <Image
              src="/icons8-firework-explosion-100.png"
              width={100}
              height={100}
              alt="Success"
              className="mx-auto mb-4"
            />
            <h4 className="text-xl font-semibold mb-2">CONGRATULATIONS!</h4>
            <p className="mb-4">Your booking was successful!</p>
            <Link href={ROUTES.HOME}
              className="continue"
            >
              CONTINUE
            </Link>
          </div>
        </div>
      )}
      </>
  );
}

