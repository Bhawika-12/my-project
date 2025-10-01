import { useState } from "react";
const EventCard = ({ event }) => {
  
  const formatDate = (dateString) => {
    if (!dateString) return "No Date Set";
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    } catch (e) {
      return dateString; 
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-indigo-500 hover:shadow-lg transition duration-300">
      <div className="flex items-center mb-1">
        {/* SVG Icon for visual appeal */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-800">{event.name}</h3>
      </div>
      <p className="text-sm text-gray-500 ml-7">
        <span className="font-medium text-indigo-600">Date:</span> {formatDate(event.date)}
      </p>
    </div>
  );
};


const App = () => {
  // 1. STATE MANAGEMENT
  // Initial state includes a sorted list of example events
  const [events, setEvents] = useState([
    { id: 1, name: "Team Retrospective", date: "2025-10-15" },
    { id: 2, name: "Project Deadline", date: "2025-10-28" },
    { id: 3, name: "Company Holiday", date: "2025-11-25" },
  ].sort((a, b) => new Date(a.date) - new Date(b.date)));

  const [formData, setFormData] = useState({ name: "", date: "" });
  const [error, setError] = useState("");

  // HANDLERS
  
  // Updates formData state for both name and date inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // Adds a new event to the list
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.date) {
      setError("Please fill in both event name and date.");
      return;
    }

    const newEvent = {
      id: Date.now(), 
      name: formData.name.trim(),
      date: formData.date,
    };

    // Immutability: Create a new array, add the new event, and sort it by date
    const updatedEvents = [...events, newEvent].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    setEvents(updatedEvents);
    setFormData({ name: "", date: "" }); // Clear form
  };

  // RENDERING

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-10 pt-4">
          🗓️ Event Calendar
        </h1>

        {/* Add Event Form (JSX logic and Event Handlers) */}
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg mb-10 border border-indigo-200">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Schedule New Event</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              name="name"
              placeholder="Event Name (e.g., Q4 Review Meeting)"
              value={formData.name}
              onChange={handleChange}
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full md:w-40 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
            <button 
              type="submit" 
              className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 ease-in-out"
            >
              Add Event
            </button>
          </form>
        </div>

        {/* Event List (List Rendering) */}
        <h2 className="text-2xl font-bold text-gray-700 mb-5">Upcoming Events ({events.length})</h2>
        <div className="grid grid-cols-1 gap-4">
          {events.length > 0 ? (
            events.map((event) => (
              // 3. PASSING PROPS: Renders the now-local EventCard component for each item
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <p className="text-center text-gray-500 p-10 bg-white rounded-xl shadow-md">No events scheduled. Add one above!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;