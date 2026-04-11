import React from 'react';
import './EventCard.css';
import img from './test.jpg'

export default function EventCard() {
    return (
        <div className='event-card'>
            <div className="event-card__inner">
            <img src={img} alt="" className="event-card__img" />
            <h1 className="event-card__header">header</h1>
            <div className="event-card__info">
            <div className="event-card__date">date</div>
            <div className="event-card__location">location</div>
            </div>
            <button className="event-card__registerbtn">register</button>
            </div>
        </div>
    )
}