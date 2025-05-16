import React from 'react';
import { getUserFromSession } from '../../../lib/auth';
import { getUserEvents } from '../../../backend/controllers/userControllers';
import Events from './Events';
import { getEventById } from '../../../backend/controllers/eventsController';

const page = async () => {
    const user = await getUserFromSession();
    const userId = user?.userId ? parseInt(user.userId.toString(), 10) : NaN;
    const usersevents=await getUserEvents(userId);
    console.log(usersevents)
    const eventIds = usersevents.map((ue: any) => ue.eventId.toString());
    const fullEvents = await Promise.all(eventIds.map(id => getEventById(id)));
  const filteredEvents = fullEvents.filter(event => event !== null);


  return (
    <Events usersevents={filteredEvents}/>
  );
}

export default page;
