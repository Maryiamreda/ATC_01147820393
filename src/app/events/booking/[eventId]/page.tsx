import React from 'react';
import { getEventById } from '../../../../../backend/controllers/eventsController';
import Form from './Form';

type paramsType = {
  params: Promise<{ eventId: string }>;
};

const BookEvent = async (props:paramsType) => {
  const {eventId} = await props.params

  return (
    <Form event={eventId}/>
  );
}

export default BookEvent;
