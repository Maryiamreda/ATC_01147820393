import React from 'react';
import { getEventById } from '../../../../../backend/controllers/eventsController';
import Form from './Form';

type Props = {
  params: { eventId: string };
};
const BookEvent = async ({ params }: Props) => {
    const event = await getEventById(params.eventId);

  return (
    <Form event={event}/>
  );
}

export default BookEvent;
