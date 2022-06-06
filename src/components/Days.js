import React, {useState, useEffect} from "react";

export default function Days(props){
    
    let [daysTemp, setDaysTemp] = useState(["-", "-", "-"])
    var today = new Date()
    var dayName = today.getDay()
    var weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday"]

    function fetchForecastData(city){
        if(city){
            const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${city}?apikey=${props.akey}&metric=true`
            fetch(url).then(res=>res.json()).then(json =>{
            const firstDay = json.DailyForecasts[1].Temperature.Minimum.Value
            const secondDay = json.DailyForecasts[2].Temperature.Minimum.Value
            const thirdDay = json.DailyForecasts[3].Temperature.Minimum.Value
            const newState = [firstDay, secondDay, thirdDay]
            setDaysTemp(newState) 
            })
            .catch(function (error) {
                console.log(error)
              });
        }
        
      }
    
    useEffect(() => {fetchForecastData(props.location)}, [props.location]);
    
    return(
        <div className="days--container">
            <div className="days--card">
                <h1>{daysTemp[0]}°</h1>
                <p>{weekDays[dayName % 7]}</p>
            </div>
            <div className="days--card">
                <h1>{daysTemp[1]}°</h1>
                <p>{weekDays[dayName+1 % 7]}</p>
            </div>
            <div className="days--card">
                <h1>{daysTemp[2]}°</h1>
                <p>{weekDays[dayName+2 % 7]}</p>
            </div>
        </div>
    )
}