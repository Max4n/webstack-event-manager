import React, { useState, useEffect } from 'react';
import './App.css';
import EventCard from './EventCard';

function App() {
  // 1. Create state to hold the events from the database
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch data from Flask when the component loads
  useEffect(() => {
    // Note: Assuming your Flask app runs on port 5000
    fetch('http://localhost:5001/events')
      .then(response => response.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="header">
        <div className="header__inner">
          <nav className='header-menu'>
            <ul className='menu__list' style={{ listStyle: 'none', display: 'flex', gap: '20px', alignItems: 'center' }}>
            <li className='menu__list-item'>
    <a href="http://localhost:3000/launcher.html" className="menu__list-link" style={{ 
        background: 'rgba(255,255,255,0.2)', 
        padding: '8px 15px', 
        borderRadius: '8px',
        fontSize: '0.9rem' 
    }}>
      Back to Portal
    </a>
  </li>
  <li className='menu__list-item'>
    <a href="/" className="menu__list-link">Upcoming Events</a>
  </li>
</ul>
          </nav>
        </div>
      </header>

      <section className="main">
        {/* 3. Map over the fetched events and pass data to EventCard */}
        {loading ? (
          <p>Loading events...</p>
        ) : events.length > 0 ? (
          events.map(event => (
            <EventCard key={event.event_id} event={event} />
          ))
        ) : (
          <p>No events found.</p>
        )}
      </section>
    </div>
  );
}

export default App;