import React from 'react';
import './EventMgmtDetails.css';

export default function EventMgmtDetails() {

    return(
        <div className="content">
            <img src="https://placehold.co/500x300" alt="placeholder_image" className="content__image"></img>
            <form>
                <input type="text" className="input__text" placeholder="Event Name"></input><br />
                <input type="text" className="input__text" placeholder="£Cost"></input><br />
                <input type="text" className="input__text" placeholder="Location"></input><br />
                <input type="text" className="input__num_short" placeholder="DD"></input>
                <input type="text" className="input__num_short" placeholder="MM"></input>
                <input type="text" className="input__num_long" placeholder="YYYY"></input>
                <label for="start_time">Start time:</label>
                <input type="text" id="start_time" name="start_time" className="input__num_long" placeholder="00:00"></input>
                <label for="end_time">End time:</label>
                <input type="text" id="end_time" name="end_time" className="input__num_long" placeholder="00:00"></input><br />
                <input type="text" className="input__num_long" placeholder="Max Attendence" style={{width: "150px"}}></input><br />
                <input type="text" className="input__desc" placeholder="Description"></input><br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    )
}