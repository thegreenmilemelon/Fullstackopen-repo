function CountryList({ countries, filterCountry }) {
  console.log(countries);
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
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img
          src={country.flags.svg}
          alt={`Flag of ${country.name.common}`}
          style={{ width: "100px" }}
        />
      </div>
    );
  };

  if (filterCountry === "") {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.name.common}>{country.name.common}</li>
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
          <li key={country.name.common}>{country.name.common}</li>
        ))}
      </ul>
    );
  }
}

export default CountryList;
