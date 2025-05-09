// app/users/page.tsx
import { getallUsers } from '../../backend/controllers/userControllers';

export default async function UsersPage() {
  const users = await getallUsers();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <ul className="space-y-2">
        {users.map((user: any) => (
          <li key={user.id} className="p-4 bg-gray-100 rounded">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
