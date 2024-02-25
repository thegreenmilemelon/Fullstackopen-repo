import { useState, useEffect } from "react";
import axios from "axios";
import countryService from "./services/countries";
import Filter from "./components/Filter";
import CountriesList from "./components/CountryList";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [filterCountry, setFilterCountry] = useState("");

  useEffect(() => {
    countryService.getAll().then((response) => {
      setCountries(response);
    });
  }, []);

  const handleChange = (event) => {
    setFilterCountry(event.target.value);
  };

  const filteredCountry = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filterCountry.toLowerCase())
  );

  return (
    <>
      <h1>Countries</h1>
      <Filter filterCountry={filterCountry} onChange={handleChange} />
      <CountriesList
        countries={filteredCountry}
        filterCountry={filterCountry}
      />
    </>
  );
}

export default App;
