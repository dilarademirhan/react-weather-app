import { useEffect, useState } from 'react'
import axios from 'axios'
import { useCity } from '../context/CitiesContext'

function Weather() {
  
  const city = useCity()

  const apiKey = "5be6d40d235fc0d84e6a889017ae002b"
  
  const getData = async () => {
    const url_coords = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const res_coords = await axios.get(url_coords)
    const url_weather = `https://api.openweathermap.org/data/2.5/onecall?lat=${res_coords.data.coord.lat}&lon=${res_coords.data.coord.lon}&appid=${apiKey}&units=metric`
    const res_weather = await axios.get(url_weather)
    return res_weather.data.daily
  }

  const [days, setDays] = useState([])
  useEffect(() => {
    getData().then(result => setDays(result))
  }, [city])
  

  const daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  const isToday = (day) => {
    const date = new Date(day.dt * 1000)
    const todaysDate = new Date()
    if(date.toDateString() === todaysDate.toDateString()) 
      return true
  }

  return (
    <>
    {
      days.map((day, i) => 
          <div className={ isToday(day) ? "today" : "card"}  key={i}>
              { daysOfWeek[new Date(day.dt * 1000).getDay()].substring(0, 3) }
              <br/><br/><br/>
              <img key={ (i+1)*56 }
              src={ `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png` } 
              alt="Weather Icon" />
              <div className='day'>{ day.temp.day + "°C" }</div>
              <span className='text'>{ day.weather[0].main }</span>
              <br/><br/><br/><br/>
              <span className='minmax'>{ day.temp.max + "°C / " + day.temp.min + "°C" } </span>
          </div>
        )
    }
    </>
  );
}

export default Weather;
