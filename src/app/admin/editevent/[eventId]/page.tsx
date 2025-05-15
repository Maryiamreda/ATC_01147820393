import React from 'react';
import { getEventById } from '../../../../../backend/controllers/eventsController';
import Form from '../Form';

type Props = {
  params: { eventId: string };
};

export default async function EditEvent({ params }: Props) { 
    const event = await getEventById(params.eventId);
    
    return (
    <Form event={event}/>
  );
}

