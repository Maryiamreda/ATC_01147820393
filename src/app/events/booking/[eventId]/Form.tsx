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
    <form action={formAction} className="bg-white rounded-xl shadow-lg mt-6 p-6 max-w-md mx-auto space-y-6" >
        <div className='flex flex-col'>
            <p  className='text-xl font-bold text-gray-800 mb-2'> you are booking tickets for ( {event?.name} ) at {event?.location}, {event?.date}
     </p>
          <div><p className='font-semibold text-lg text-gray-800 mb-1'>  please specify the no of tickets you want :</p>
           <input type='number' name='quantity' min={1} defaultValue={1} 
        className="border border-gray-300 rounded px-3 py-2   w-14"

      />
          </div>  
     
            <input type="hidden" name="eventId" value={event.id} />

      <button type='submit' className='bg-emerald-800 px-10 py-3 mt-4 text-white rounded-full cursor-pointer'>BOOK</button>
      
        </div>
     
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

