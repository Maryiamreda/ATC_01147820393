// app/users/page.tsx

import { revalidatePath } from 'next/cache';
import { getEvents , deleteEvent } from '../../../../backend/controllers/eventsController';
import ROUTES from '../../../../lib/routes';

export default async function UsersPage() {
  const users = await getEvents();
async function handleDelete(formData: FormData) {
    'use server';
    const eventId = Number(formData.get('eventId'));
    await deleteEvent(eventId);
    revalidatePath(ROUTES.ADMIN.DASHBOARD); // Auto refresh after delete
  }
 
   return (
    <div className="p-6">
      <h1 className="text-6xl font-bold mb-4">All Events</h1>
      <ul className="space-y-2">
        {users.map((user: any) => (
          <li key={user.id} className="p-4 bg-gray-100 rounded">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
<form action={handleDelete}>
              <input type="hidden" name="eventId" value={user.id} />
              <button 
                type="submit" 
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
              >
                Delete
              </button>
            </form>          </li>
        ))}
      </ul>
    </div>
  );
}
