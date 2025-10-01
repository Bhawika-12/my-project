import React from 'react';

const Event = ({ event }) => {
  
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

export default Event;
