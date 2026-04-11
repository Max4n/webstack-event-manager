import './EventMgmtCard.css';
import React, { useState, useEffect } from "react";

export default function EventMgmtCard({ token }) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5001/events/", {
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then((res) => res.json())
        .then((data) => {
            setEvents(data);
            setLoading(false);
        })
        .catch((error) => console.error(error));
    }, [token]);

    // The Delete Function!
    const handleDelete = async (eventId) => {
        if (!window.confirm("Are you sure you want to delete this event?")) return;
        
        try {
            const response = await fetch(`http://localhost:5001/events/${eventId}`, {
                method: 'DELETE',
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (response.ok) {
                // Instantly remove the deleted event from the screen
                setEvents(events.filter(event => event.event_id !== eventId));
            } else {
                alert("Failed to delete event.");
            }
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    if (loading) return <h2>Loading events...</h2>;

    return(
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
            {events.length > 0 ? events.map((event) => (
                <div className="card" key={event.event_id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
                    <h2 className="card__header">{event.title}</h2>
                    <p><strong>Date:</strong> {event.event_date} | <strong>Time:</strong> {event.event_time}</p>
                    <p><strong>Category:</strong> {event.category || event.category_id}</p>
                    <p>{event.description}</p>
                    
                    <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                        {/* Edit Button passes the ID in the URL */}
                        <a href={`/details?edit=${event.event_id}`}>
                            <button style={{ padding: '8px 15px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                        </a>
                        {/* Delete Button */}
                        <button 
                            onClick={() => handleDelete(event.event_id)} 
                            style={{ padding: '8px 15px', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            Delete
                        </button>
                    </div>
                </div>
            )) : (
                <p>No events found. Time to create one!</p>
            )}
        </div>
    );
}