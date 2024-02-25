import { useState, useEffect } from "react";
import axios from "axios";

function CountryList({ countries, filterCountry }) {
  console.log(countries);
  const [isDisplay, setIsDisplay] = useState(false);
  const [weather, setWeather] = useState();

  const api_key = import.meta.env.VITE_API_KEY;
  const iconURL = "https://openweathermap.org/img/wn/";

  useEffect(() => {
    if (countries.length === 1) {
      const capital = countries[0].capital[0];
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
        )
        .then((response) => {
          console.log("weather data", response.data);
          setWeather(response.data);
        });
    }
  }, [countries]);

  const getWeatherIcon = (weatherCode) => {
    switch (Math.floor(weatherCode / 100)) {
      case 2:
        return "11d.png";
      case 3:
        return "09d.png";
      case 5:
        switch (weatherCode) {
          case 500:
          case 501:
          case 502:
          case 503:
          case 504:
            return "10d.png";
          case 511:
            return "13d.png";
          default:
            return "09d.png";
        }
      case 6:
        return "13d.png";
      case 7:
        return "50d.png";
      case 8:
        switch (weatherCode) {
          case 800:
            return "01d.png";
          case 801:
            return "02d.png";
          case 802:
            return "03d.png";
          case 803:
          case 804:
            return "04d.png";
          default:
            return "01d.png";
        }
      default:
        return "01d.png";
    }
  };

  const toggleDisplay = (countryName) => {
    setIsDisplay(countryName.ccn3 === isDisplay ? false : countryName.ccn3);
  };
  const renderCountryDetail = (country) => {
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>
          <strong>Capital:</strong> {country.capital.join(", ")}
        </p>
        <p>
          <strong>Area:</strong> {country.area} km²
        </p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={country.name.common}>{language}</li>
          ))}
        </ul>
        <img
          src={country.flags.svg}
          alt={`Flag of ${country.name.common}`}
          style={{ width: "100px" }}
        />
        <h3>Weather in {country.capital}</h3>
        {weather && (
          <div>
            <p>
              <strong>Temperature:</strong> {weather.main.temp} Celsius
            </p>
            <img
              src={`${iconURL}${getWeatherIcon(weather.weather[0].id)}`}
              alt=""
            />
            <p>
              <strong>Wind:</strong> {weather.wind.speed} m/s
            </p>
            <p>
              <strong>Description:</strong> {weather.weather[0].description}
            </p>
          </div>
        )}
      </div>
    );
  };

  if (filterCountry === "") {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.ccn3}>{country.name.common}</li>
        ))}
      </ul>
    );
  }

  if (countries.length === 0) {
    return <div>No countries found</div>;
  } else if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length === 1) {
    return renderCountryDetail(countries[0]);
  } else {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.ccn3}>
            {country.name.common}{" "}
            <button onClick={() => toggleDisplay(country)}>
              {isDisplay === country.ccn3 ? "hide" : "show"}
            </button>
            {isDisplay === country.ccn3 && renderCountryDetail(country)}
          </li>
        ))}
      </ul>
    );
  }
}

export default CountryList;
