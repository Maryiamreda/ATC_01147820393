// app/admin/dashboard/page.tsx

import { checkAdminAuth } from "../../../../lib/checkAdminAuth";
import { adminLogout } from "../login/action";

export default async function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold">Admin Panel</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="mr-4">Logged in as: </span>
              <form action={adminLogout}>
                <button 
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                >
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Welcome to Admin Dashboard</h2>
              <p>
                This is your admin control panel. From here, you can manage events, users, and other aspects of your application.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-blue-50 p-4 rounded-lg shadow">
                  <h3 className="font-semibold text-lg">Events</h3>
                  <p className="text-gray-600">Manage all events in the system</p>
                  <a href="/admin/events" className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
                    View Events →
                  </a>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg shadow">
                  <h3 className="font-semibold text-lg">Users</h3>
                  <p className="text-gray-600">Manage user accounts and permissions</p>
                  <a href="/admin/users" className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
                    View Users →
                  </a>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg shadow">
                  <h3 className="font-semibold text-lg">Reports</h3>
                  <p className="text-gray-600">View system reports and analytics</p>
                  <a href="/admin/reports" className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
                    View Reports →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}