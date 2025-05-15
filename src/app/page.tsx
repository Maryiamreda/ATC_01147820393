import React from "react";
import { getEvents } from "../../backend/controllers/eventsController";
import EventsList from "./EventsList"; // client component

export default async function UsersPage() {
  const events = await getEvents();
  return <EventsList events={events} />;
}