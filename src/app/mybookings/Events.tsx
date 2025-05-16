import React from 'react';
import Image from 'next/image';

const Events = ({  usersevents }: {  usersevents: any[] }) => {
  return (
      <div className="p-6 max-w-6xl mx-auto text-gray-700">
      <h1 className="text-4xl font-bold mb-6">My Booked Events</h1>

      {usersevents.length === 0 ? (
        <p className="text-gray-500 text-lg">You haven't booked any events yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {usersevents.map((event: any) => (
            <div
              key={event.id}
              className="border border-blue-200 bg-white rounded-xl overflow-hidden shadow-md hover:translate-y-[-5px] transition-all duration-300"
            >
                          <Image
                 className="bg-blue-50 object-cover"
                  src={event.image}
                  alt={event.name}
                 width={300}
              height={200}
                   />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{event.name}</h2>
                <p className="text-sm text-gray-500">{event.date}</p>
                <p className="text-sm text-gray-500">{event.location || "N/A"}</p>
                <p className="text-sm font-medium text-emerald-700 mt-2">Fees: ${event.fees}</p>
                <p className="mt-3 inline-block bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded">
                  Booked
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;
