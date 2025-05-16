import { getEventById } from '../../../../../backend/controllers/eventsController';
import Form from '../Form';

export default async function EditEvent({ params }: { params: Promise<{ eventId: string }> }) {
    const { eventId } = await params;

    const event = await getEventById(eventId);

    return <Form event={event} />;
}
