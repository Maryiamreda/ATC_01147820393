import { getEventById } from '../../../../backend/controllers/eventsController';
import { notFound } from 'next/navigation';
import { getUserFromSession } from '../../../../lib/auth';
import { getUserEvents } from '../../../../backend/controllers/userControllers';
import EventDetails from './eventDetails';

//pageProps type  for Next.js app router
type PageProps = {
  params: {
    eventId: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function EventDetailsPage({ params }: PageProps) {
  const event = await getEventById(params.eventId);
  
  if (!event) {
    notFound();
  }

  const user = await getUserFromSession();
  const userId = user?.userId ? parseInt(user.userId.toString(), 10) : NaN;

  const usersevents = await getUserEvents(userId);
  console.log(usersevents);
  
  return (
    <EventDetails event={event} usersevents={usersevents} />
  );
}