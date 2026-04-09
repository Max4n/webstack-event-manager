import React from 'react';
import './EventMgmtCard.css';

export default function EventMgmtCard() {
    return(
        <div className='card'>
            <img src="https://placehold.co/500x300" alt="placeholder_image" className="card__image"></img>
            <div className="card__info">
                <h1 className="card__header">header</h1>
                <div className="card__profit">Profit: £0.00</div>
                <div className="card__attendance">Attendance: 0</div>
            </div>
        </div>
    )
}