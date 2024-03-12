import React, { useEffect, useState } from "react";
import { fetchEventData, EventData } from "../../apiRequests/getEvent";
import CreateEventModal from "./CreateEvent";
import { useTranslation } from "react-i18next";

const Events: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {t} = useTranslation()
  
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
      <div>
        <CreateEventModal />
      </div>
      <h1>{t("Events")}</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}> {/* Added inline styles for the container */}
        {events.map((event, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              margin: "10px",
              width: "200px" // Set width according to your design
            }}
          >
            <h2>{event.eventName}</h2>
            <p>{t("Venue")}: {event.venue}</p>
            <p>{t("Date")}: {event.date}</p>

          </div>
        ))}
      </div>
    </div>
  );
};


export default Events;
