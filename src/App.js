import axios from 'axios'
import {useEffect, useState} from 'react'
import Map from './Map'

function App() {
  const [isClickMap,setIsClickMap] = useState(false)
  const [isLoaded,setIsLoaded] = useState(false)
  const [data,setData] = useState({})
  const [location,setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=e97898b77438d57329f4a668063b711a`

  const searchLocation = (event) => {
    if(event.key === 'Enter'){
      axios.get(url)
        .then(response => {
          setData(response.data)
        })
        .catch(err => console.log(err))
      setLocation('')
    }
  }

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=hue&units=imperial&appid=e97898b77438d57329f4a668063b711a`)
        .then(response => {
          setData(response.data)
        })
        .catch(err => console.log(err))
    // eslint-disable-next-line
  },[])

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder='Enter Location'
          type="text" />

          <button className='mapBtn' onClick={() => setIsClickMap(true)}>Map</button>
      </div>

      {isClickMap && <Map setData={setData} setLocation={setLocation} setIsClickMap={setIsClickMap} isLoaded={isLoaded} setIsLoaded={setIsLoaded} />}

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{((data.main.temp-32)*(5/9)).toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{((data.main.feels_like-32)*(5/9)).toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
