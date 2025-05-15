
export default function EventNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Event Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">
        The event you're looking for doesn't exist or has been removed.
      </p>
    
    </div>
  );
}