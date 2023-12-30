import { useState, useEffect } from 'react'
import axios from 'axios'

const countriesURL = 'https://restcountries.com/v3.1/all'

const superDuperSecretKey = `${process.env.REACT_APP_WEATHER_API_KEY}` //I know React client side is not safe

const weatherURL = city => {
  return `https://api.weatherapi.com/v1/current.json?key=${superDuperSecretKey}&q=${city}&aqi=no`
}

const GeoAPI = () => {

  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get(countriesURL)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  useEffect(()=> {
    if (filteredCountries.length === 1) {
      const capital = filteredCountries[0].capital
      console.log(`Getting weather of ${capital}`)
      axios
        .get(weatherURL(capital))
        .then(response => {
          const weather = response.data          
          setWeather(weather)
          
        })
    }
  }, [filter])

  

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleShowCountry = countryName => {
    setFilter(countryName)
  }

  return (
    <div id="content">
      <div className="geoAPI">
        <Inputfield filter={filter} handleFilterChange={handleFilterChange} />
        <Countries countries={filteredCountries} handleShowCountry={handleShowCountry} />
        <Weather countries={filteredCountries} weather={weather} />
      </div>
    </div>
  )
}

const Countries = ({countries, handleShowCountry}) => {

  if(countries.length > 10) {
    return (
      <p>Too many countries</p>
    )
  }
  
  if(countries.length > 1) {
    return (
      <ul>
        {countries.map(country => <CountryListed key={country.name.common} country={country} handleShowCountry={handleShowCountry} />)}
      </ul>      
    )
  }

  if(countries.length === 1) {
    return(
      <div>
        <Country country={countries[0]} />
      </div>
    )
  }

  return (
    <p>No countries exist with this name</p>
  )
}

const CountryListed = ({country, handleShowCountry}) => {
  return (
    <li>
      <div className="listedCountry">

        <p>{country.name.common}</p>
        <button className="showButton" onClick={() => handleShowCountry(country.name.common)}>show</button>
      </div>
    </li>
  )
}

const Country = ({country}) => {
  return (
  <div className="country">
    <div className="countryInfo">
      <p>{country.name.common}</p> 
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km2</p>
      <p>Languages:</p>
      <Languages languages={country.languages} />
    </div>
    
    <div className="flag">
      <Flag country={country} />
    </div>
  </div>
  )
}

const Weather = ({countries, weather}) => {

  if(countries.length !== 1 || weather === undefined || weather === null) {
    return (
      <div>
      </div>
    )
  }

  const country = countries[0]

  const mps = (weather.current.wind_kph / 3.6).toFixed(2)

  return (
    <>
      <div className="weather">
        <div className="weatherInfo">
          <p>Weather in {country.capital}</p>
          <p>Temperature: {weather.current.temp_c}° C</p>
          <p>Wind: {mps} m/s</p>
        </div>
        <div className="weatherIcon">
          <img className="icon" src={weather.current.condition.icon} alt={weather.current.condition.text}></img>
        </div>
      </div>
    </>
  )
}

const Flag = ({country}) => {
  const imageURL = country.flags.png
  return (
    <div>
      <img src={imageURL} alt={`Flag of ${country.name.common}`}></img>
    </div>    
  )  
}

const Languages = ({languages}) => {

  const languageNames = Object.values(languages)
  return (
    <ul>
      {languageNames.map(language => <Language key={language} language={language}/>)}
    </ul>
  )
}

const Language = ({language}) => {
  return (
    <li>{language}</li>
  )
}

const Inputfield = ({filter, handleFilterChange}) => {
  return(
    <div className="allInput">
      <p>SEARCH COUNTRY:</p>
      <input
        onChange={handleFilterChange}
        value={filter}
      />
    </div>    
  )
}

export default GeoAPI;
