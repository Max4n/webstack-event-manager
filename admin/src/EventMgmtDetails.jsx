import React, { useState, useEffect } from 'react';
import './EventMgmtDetails.css';

export default function EventMgmtDetails({ token }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [venueId, setVenueId] = useState('');
    const [message, setMessage] = useState('');

    // Check the URL to see if we are editing an existing event
    const searchParams = new URLSearchParams(window.location.search);
    const editId = searchParams.get('edit'); 
    const isEditMode = Boolean(editId);

    // If in Edit Mode, fetch the existing data when the page loads
    useEffect(() => {
        if (isEditMode) {
            fetch(`http://localhost:5001/events/${editId}`)
                .then(res => res.json())
                .then(data => {
                    setTitle(data.title);
                    setDescription(data.description);
                    setEventDate(data.event_date);
                    setEventTime(data.event_time);
                    setCategoryId(data.category_id || data.category); // Fallback
                    setVenueId(data.venue_id || data.venue_name);     // Fallback
                })
                .catch(err => console.error("Failed to load event data", err));
        }
    }, [editId, isEditMode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const payload = {
            title: title,
            description: description,
            event_date: eventDate,
            event_time: eventTime,
            category_id: parseInt(categoryId),
            venue_id: parseInt(venueId)
        };

        // Determine the correct route and HTTP method
        const url = isEditMode ? `http://localhost:5001/events/${editId}` : 'http://localhost:5001/events/';
        const method = isEditMode ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(`Success: Event ${isEditMode ? 'updated' : 'created'} successfully!`);
                if (!isEditMode) {
                    // Only clear the form if we were creating a new one
                    setTitle(''); setDescription(''); setEventDate('');
                    setEventTime(''); setCategoryId(''); setVenueId('');
                }
            } else {
                setMessage(`Error: ${data.error || data.msg || 'Failed to save event'}`);
            }
        } catch (err) {
            setMessage('Failed to connect to the server.');
        }
    };

    return(
        <div className="content" style={{ textAlign: 'center', padding: '20px' }}>
            <h2>{isEditMode ? 'Edit Event' : 'Create New Event'}</h2>
            
            {message && <p style={{ color: message.startsWith('Success') ? 'green' : 'red', fontWeight: 'bold' }}>{message}</p>}
            
            <form onSubmit={handleSubmit} style={{ display: 'inline-flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
                <input type="text" placeholder="Event Title" value={title} onChange={e => setTitle(e.target.value)} required />
                <textarea placeholder="Event Description" value={description} onChange={e => setDescription(e.target.value)} rows="3" />
                
                <label style={{ textAlign: 'left', fontSize: '14px' }}>Date:</label>
                <input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} required />
                
                <label style={{ textAlign: 'left', fontSize: '14px' }}>Time:</label>
                <input type="time" value={eventTime} onChange={e => setEventTime(e.target.value)} required />
                
                <input type="number" placeholder="Category ID" value={categoryId} onChange={e => setCategoryId(e.target.value)} required />
                <input type="number" placeholder="Venue ID" value={venueId} onChange={e => setVenueId(e.target.value)} required />
                
                <button type="submit" style={{ marginTop: '10px', padding: '10px', background: isEditMode ? '#FF9800' : '#4CAF50', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
                    {isEditMode ? 'Update Event' : 'Create Event'}
                </button>
            </form>
        </div>
    );
}