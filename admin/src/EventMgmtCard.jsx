import './EventMgmtCard.css';
import React, { useState, useEffect } from "react";

export default function EventMgmtCard() {

    const [data, setdata] = useState({
    title: "",
    description: "",
    event_date: "",
    event_time: "",
    category_id: "",
    venue_id: "",
    })

    useEffect(() => {
    fetch("/data").then((res) =>
        res.json().then((data) =>
        setdata({
        title: data.title,
        description: data.description,
        event_date: data.event_date,
        event_time: data.event_time,
        category_id: data.category_id,
        venue_id: data.venue_id,
        }))
    )
    })

    return(
        <div>
            <div className="card">
                <a href="./details">
                    <div>
                        <img src="https://placehold.co/500x300" alt="placeholder_image" className="card__image"></img>
                        <div className="card__info">
                            <h1 className="card__header">header</h1>
                            <div className="card__profit">Profit: £0.00</div>
                            <div className="card__attendance">Attendance: 0</div>
                            <p>{data.description}</p>
                            <p>{data.event_date}</p>
                            <p>{data.event_time}</p>
                            <p>{data.category_id}</p>
                            <p>{data.venue_id}</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    )
}