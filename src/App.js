import React, { useState, useEffect } from 'react';
import Header from './components/Header'
import Today from './components/Today'
import Days from './components/Days'

function App() {
  let apiKey = "il7yGqu8xNqeL1kgHJz9xSq9Up5dZhHF"/*"fWYwSt7F5P3kKxZNoyApko8VevJ3N6os"*/
  let apiKeyForLocation = "fc6e639847024e388edc79b5b53e3acb"
  let [displayCityName, setDisplayCityName] = useState(null)
  let [city, setCity] = useState(null)

  function fetchLocationData(cityName_){
    const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${cityName_}`
    fetch(url).then(res=>res.json()).then(json =>{
      if (json.length == 0) {
        alert(`Location "${cityName_}" can not be found`)
      } else {
        const cityKey = json[0].Key
        setCity(cityKey)
      }
    })
  }

  async function fetchCurrentLocation(){
    navigator.geolocation.getCurrentPosition(function(position) {
      if (city === null) {
        const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${ position.coords.latitude}&longitude=${ position.coords.longitude}&localityLanguage=hu`;
        fetch(url).then(res=>res.json()).then(json=>{
          const Name = json.principalSubdivision
          setDisplayCityName(Name)
          fetchLocationData(Name);
        })
      }      
    });
  }

  
  

  useEffect(() => {fetchCurrentLocation()});

  return (
    <div className="App">
      <Header fetchLocationData ={fetchLocationData}
      setDisplayCityName={setDisplayCityName} displayCityName={displayCityName}/>
      <Today location={city} akey={apiKey}/>
      <Days location={city} akey={apiKey}/>
    </div>
  );
}

export default App;