import { eventWrapper } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useState } from "react";

export default function Header(props){
    
    var today = new Date()
    var day = today.getDate()
    var month = today.getMonth() + 1
    var year = today.getFullYear()
    var dayName = today.getDay()
    var weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    var currentdate = `${month}/${day}/${year}`
    let [locationText, setLocationText] = useState("")


    let handleTextChanged = (event) => {
        setLocationText(event.target.value);
    }

    let handleSubmit = (event) => {
        props.setDisplayCityName(locationText)
        props.fetchLocationData(locationText) 
        event.preventDefault()
    }


    
    return(
        <header>
            <h1>My Weather App</h1>
                <form className="header--input" onSubmit={handleSubmit}>
                    <input 
                    type="text" 
                    onChange={handleTextChanged} 
                    value={locationText}
                    />
                </form>
            <div className="header--location">
            <p>{props.displayCityName}</p>
            <p>{currentdate}, {weekDays[dayName-1]}</p>
            </div>
        </header>
    )
}