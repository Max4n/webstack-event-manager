import React from 'react';
import './EventCard.css';

export default function EventCard() {
    return (
        <div className='event-card'>
            <img src="" alt="" className="event-card__image" />
            <div className="event-card__info">
            <h1 className="event-card__header">header</h1>
            <div className="event-card__date"></div>
            <div className="event-card__location"></div>
            <button className="event-card__registerbtn"></button>
            </div>
        </div>
    )
}