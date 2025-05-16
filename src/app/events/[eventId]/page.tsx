import { getEventById } from '../../../../backend/controllers/eventsController';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ROUTES from '../../../../lib/routes';
import { getUserFromSession } from '../../../../lib/auth';
import { getUserEvents } from '../../../../backend/controllers/userControllers';
import EventDetails from './eventDetails';

type Props = {
  params: { eventId: string };
};


export default async function EventDetailsPage({ params }: Props) {
  const event = await getEventById(params.eventId);
  
  if (!event) {
    notFound();
  }
const user = await getUserFromSession();
const userId = user?.userId ? parseInt(user.userId.toString(), 10) : NaN;

  const usersevents = !isNaN(userId) ? await getUserEvents(userId) : [];
  const isLoggedIn = !!user?.userId;

console.log(usersevents)
  return (
   <EventDetails  event={event} usersevents={usersevents} isLoggedIn={isLoggedIn}/>
  );
}