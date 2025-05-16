import { getEventById } from '../../../../backend/controllers/eventsController';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';


type Props = {
  params: { eventId: string };
};


export default async function EventDetailsPage({ params }: Props) {
  const event = await getEventById(params.eventId);
  
  if (!event) {
    notFound();
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
     
      <div className="bg-white rounded-xl overflow-hidden shadow-lg">
        <div className="md:flex">
          {/* Event Image */}
          <div className="md:w-1/2">
            <Image
              src={event.image}
              alt={event.name}
              width={600}
              height={400}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          
          {/* Event Details */}
          <div className="md:w-1/2 p-6">
            <div className="flex gap-2 mb-4">
              {event.eventType === 'online' && (
              <p className="bg-blue-100 text-blue-800 p-1 px-2 rounded text-sm font-semibold mr-1">
                  <span className="bg-red-600 rounded-full w-2 h-2 inline-block"></span>
                  online
                </p>
              )}
              {event.eventType === 'in-person' && (
              <p className="bg-blue-100 text-blue-800 p-1 px-2 rounded text-sm font-semibold mr-1">
                  <span className="bg-pink-500 rounded-full w-2 h-2 inline-block"></span>
                  in person
                </p>
              )}
              <p className="bg-blue-100 text-blue-800 p-1 px-2 rounded text-sm font-semibold">
                {event.eventCategory}
              </p>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{event.name}</h1>
            <p className="text-lg font-semibold text-emerald-800 mb-4">${event.fees}</p>
            
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-sm text-gray-500 font-medium">Date & Time</h3>
                <p className="text-gray-800">{event.date}</p>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-500 font-medium">Location</h3>
                <p className="text-gray-800">{event.location || "Online Event"}</p>
              </div>
               <div className="">
                 <p className="text-gray-600 whitespace-pre-line">
                   {event.description || "No description available for this event."}
                 </p>
        </div>
             
            </div>
            
            <button 
              className="bg-emerald-800 text-white w-full py-3 rounded-md text-base font-medium cursor-pointer hover:bg-emerald-700"
            >
              Book Now!
            </button>
          </div>
        </div>
        
       
      </div>
    </div>
  );
}