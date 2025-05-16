"use client";
import Link from 'next/link';
import Image from 'next/image';
import ROUTES from '../../lib/routes';
import { useContext, useState } from 'react';
import { ThemeContext } from '@/context/ThemeProvider';

const EventsList = ({ events, usersevents }: { events: any[], usersevents: any[] }) => {
  const { theme } = useContext(ThemeContext);
  const [filter, setFilter] = useState<string>("all");

  const filteredEvents = events.filter((event) => {
    if (filter === "all") return true;
    return event.eventType === filter;
  });

  const cardBackground = theme === "dark" ? "rgba(30, 41, 59, 0.85)" : "white";

  return (
    <div className="p-6 text-gray-600 mb-20">
      <h1 className="text-6xl font-bold mb-4">All Events</h1>
      <div className="flex gap-2">
        <p
          onClick={() => setFilter("all")}
          className="bg-blue-100 text-blue-800 p-1 px-2 rounded text-sm font-semibold cursor-pointer">
          <span className="bg-emerald-800 rounded-full w-2 h-2 inline-block mr-1"></span>
          All
        </p>
        <p
          onClick={() => setFilter("online")}
          className="bg-blue-100 text-blue-800 p-1 px-2 rounded text-sm font-semibold cursor-pointer">
          <span className="bg-red-600 rounded-full w-2 h-2 inline-block mr-1"></span>
          online
        </p>
        <p
          onClick={() => setFilter("in person")}
          className="bg-blue-100 text-blue-800 p-1 px-2 rounded text-sm font-semibold cursor-pointer"
        >
          <span className="bg-pink-500 rounded-full w-2 h-2 inline-block mr-1"></span>
          in person
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
        {filteredEvents.map((event: any) => {
          const isBooked = usersevents.some((userEvent) => userEvent.id === event.id);

          return (
            <Link
              href={ROUTES.EVENTS.DETAILS(event.id)}
              key={event.id}
              style={{
                backgroundColor: cardBackground,
              }}
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

                {isBooked ? (
                  <button
                    disabled
                    className="bg-gray-400 text-white w-full py-2 my-4 rounded-md text-base cursor-not-allowed"
                  >
                    Booked
                  </button>
                ) : (
                  <Link href={ROUTES.EVENTS.BOOKEVENT(event.id)}>
                    <button
                      type='submit'
                      className="bg-emerald-800 text-white w-full py-2 my-4 rounded-md text-base cursor-pointer hover:bg-emerald-700"
                    >
                      Book Now !
                    </button>
                  </Link>
                )}

              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default EventsList;
