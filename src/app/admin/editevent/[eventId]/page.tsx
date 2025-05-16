import { getEventById } from '../../../../../backend/controllers/eventsController';
import Form from '../Form';

export default async function EditEvent({ params }: { params: { eventId: string } }) { 
    const event = await getEventById(params.eventId);
    
    return (
        <Form event={event} />
    );
}
