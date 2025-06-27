import React from "react";

const events = [
  {
    id: 1,
    title: "Urban Gardening Workshop",
    date: "June 10, 2025",
    location: "Dhaka Community Center",
    description: "Learn how to grow vegetables in small spaces and containers.",
  },
  {
    id: 2,
    title: "Composting 101",
    date: "June 18, 2025",
    location: "Online (Zoom)",
    description: "A beginner-friendly session on making compost at home.",
  },
  {
    id: 3,
    title: "Herb Garden Masterclass",
    date: "June 25, 2025",
    location: "GreenBond HQ",
    description: "Discover the secrets to growing a thriving herb garden.",
  },
  {
    id: 4,
    title: "Kids Gardening Day",
    date: "July 2, 2025",
    location: "City Park",
    description: "Fun gardening activities and learning for children.",
  },
  {
    id: 5,
    title: "Vertical Gardening Demo",
    date: "July 10, 2025",
    location: "Online (YouTube Live)",
    description: "Live demonstration on setting up a vertical garden at home.",
  },
  {
    id: 6,
    title: "Organic Pest Control Workshop",
    date: "July 18, 2025",
    location: "Dhaka Community Center",
    description: "Learn safe and organic ways to protect your plants.",
  },
];

const UpcomingEvents = () => (
  <div className="my-10">
    <h2 className="lg:text-3xl text-2xl text-green-800 font-bold text-left mb-8">
      🌱 Upcoming <span className="text-red-700">Events</span>
    </h2>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <div
          key={event.id}
          className="card bg-base-100 shadow border border-green-100"
        >
          <div className="card-body">
            <h3 className="card-title text-green-700">{event.title}</h3>
            <p className="text-sm text-base-content/70">{event.description}</p>
            <div className="flex justify-between items-center mt-2 text-xs">
              <span className="border border-green-400 p-1 rounded-2xl bg-green-100 text-green-900 font-semibold">
                {event.date}
              </span>
              <span className="border border-green-400 p-1 rounded-2xl bg-green-100 text-green-900 font-semibold">
                {event.location}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default UpcomingEvents;
