import React, { useEffect, useState } from "react";
import { fetchEventData, EventData } from "../apiRequests/getEvent";

const Events: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventData = await fetchEventData();
        setEvents(eventData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <h2>{event.eventName}</h2>
            <p>Venue: {event.venue}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
