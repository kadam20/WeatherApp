import React, { useEffect, useState } from "react";

export default function Today(props){
    
    let [temp, setTemp] = useState("-")
    let [weatherText, setWeatherText] = useState("-")
    let [dayTime, setdayTime] = useState("-")
    let [perception, setperception] = useState("-")

    function fetchTempData(location) {
        if(location){
            const url = `http://dataservice.accuweather.com/currentconditions/v1/${location}?apikey=${props.akey}`
            fetch(url).then(res => res.json()).then(json => {
            const weatherText = json[0].WeatherText;
                    const tempCelsius = json[0].Temperature.Metric.Value;
                    const dayTime = json[0].IsDayTime;
                    const perception = json[0].HasPerception;
                    setTemp(tempCelsius);
                    setWeatherText(weatherText)
                    setdayTime(dayTime)
                    setperception(perception)
            })
            .catch(function (error) {
                console.log(error)
            });
        }
    }

    useEffect(() => fetchTempData(props.location));

    return(
        <section>
            <div className="today--degree">
                {temp}°              
            </div>
            <div className="today--container">
                <div>Description<br></br>{weatherText} </div>
                <div>Day Time<br></br>{dayTime ? "Day" : "Night"}</div>
                <div>Perception<br></br>{perception ? "Present" : "Absent"}</div>
            </div>
        </section>
    )
}