import React from "react";
import { getEvents } from "../../backend/controllers/eventsController";
import EventsList from "./EventsList"; // client component
import { getUserFromSession } from "../../lib/auth";
import { getUserEvents } from "../../backend/controllers/userControllers";

export default async function UsersPage() {
  const events = await getEvents();
  const user = await getUserFromSession();
  const userId = user?.userId ? parseInt(user.userId.toString(), 10) : NaN;

  // check if theres no user 
  const usersevents = !isNaN(userId) ? await getUserEvents(userId) : [];

  console.log("User events:", usersevents);

  return <EventsList events={events} usersevents={usersevents} />;
}
