import React from "react";
import { getEvents } from "../../backend/controllers/eventsController";
import EventsList from "./EventsList"; // client component
import { getUserFromSession } from "../../lib/auth";

export default async function UsersPage() {
  const events = await getEvents();
  const user = await getUserFromSession();

  return <EventsList events={events}   isAuthenticated={!!user} />;
}