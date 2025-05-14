import { getEvents } from '../../backend/controllers/eventsController';
import Image from 'next/image';

export default async function UsersPage() {
  const events = await getEvents();

  return (
    <div className="p-6 text-gray-600 mb-20">
      <h1 className="text-6xl font-bold mb-4">All Events</h1>
      <div className="flex gap-2">
  <p className="flex items-center gap-1 bg-gray-200 p-1 rounded border border-blue-100 text-sm font-semibold">
    <span className="bg-red-600 rounded-full w-2 h-2 inline-block"></span>
    online
  </p>
  <p className="flex items-center gap-1 bg-gray-200 p-1 rounded border border-blue-100 text-sm font-semibold">
    <span className="bg-pink-500 rounded-full w-2 h-2 inline-block"></span>
    in person
  </p>
</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
        {events.map((event: any) => (
          <div
            key={event.id}
            className="border border-blue-200 overflow-hidden w-fit rounded-xl cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
            {/* <div className='absolute  top-3 right-3 flex  gap-2'>
               <p className="bg-emerald-800 text-white  rounded-md text-base "    >on-line</p>
        <p className="bg-emerald-800 text-white   rounded-md text-base  "    >in person</p>
            </div> */}
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
              {/* <p className="text-gray-600 text-sm">Type: {event.eventType}</p>
              <p className="text-gray-600 text-sm">Category: {event.eventCategory}</p> */}
              <button 
      type='submit' 
   className="bg-emerald-800 text-white w-full py-2 my-4  rounded-md text-base cursor-pointer "    >
Book  Now !  </button>   
            </div>
              
          </div>
        ))}
      </div>
    </div>
  );
}
