// app/users/page.tsx

import { revalidatePath } from 'next/cache';
import { getEvents , deleteEvent } from '../../../../backend/controllers/eventsController';
import ROUTES from '../../../../lib/routes';
import Image from 'next/image';
import Link from 'next/link';

export default async function UsersPage() {
  const events = await getEvents();

async function handleDelete(formData: FormData) {
    'use server';
    const eventId = Number(formData.get('eventId'));
    await deleteEvent(eventId);
    revalidatePath(ROUTES.ADMIN.DASHBOARD); // Auto refresh after delete
  }
  return (
    <div className="p-6 text-gray-600 mb-20">
      <h1 className="text-6xl font-bold mb-4">All Events</h1>
      <Link
      className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"

       href={ROUTES.ADMIN.ADDEVENT}>Add New Even ?</Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
        {events.map((event: any) => (
        <Link
           href={ROUTES.ADMIN.EDITEVENT(event.id)}   
            key={event.id}
            className="border border-blue-200 overflow-hidden w-fit rounded-xl cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
            <Image
              className="bg-blue-50"
              src={event.image}
              alt={event.name}
              width={300}
              height={200}
              objectFit="cover"
            />
            <div className="px-5 py-2 text-start">
              <h2 className="text-black font-semibold">{event.name}</h2>
              <p className="text-gray-600 text-sm font-semibold">{event.date}</p>
              <p className="text-gray-600 text-sm">Fees: ${event.fees}</p>
              <p className="text-gray-600 text-sm">{event.location || "N/A"}</p>
              <div className='flex items-center justify-center gap-2'>
                 <p 
            className= "mt-2 px-4 py-2 bg-emerald-800 text-white  rounded cursor-pointer "    >
             Edit </p>   

            <form action={handleDelete}>
              <input type="hidden" name="eventId" value={event.id} />
              <button 
                type="submit" 
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
              >
                Delete
              </button>
            </form>     

              </div>
             
            </div>
              
          </Link>
        ))}
      </div>
    </div>
  );
}








