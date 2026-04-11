import React from 'react';
import './EventCard.css';

function EventCard({ event }) {
  return (
    <div className="event-card">
      <div className="event-card__inner">
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p><strong>Date:</strong> {event.event_date} at {event.event_time}</p>
      <p><strong>Category:</strong> {event.category}</p>
      <p><strong>Venue:</strong> {event.venue_name}</p>
      </div>
    </div>
  );
}

export default EventCard;