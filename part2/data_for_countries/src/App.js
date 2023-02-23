import { useState, useEffect } from "react";
import countryServices from "./services/countries";

const Country = ({ country }) => {
  const languages = [];
  for (let language in country.languages) {
    languages.push(
      <li key={country.name.common + language}>
        {country.languages[language]}
      </li>
    );
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital} </div>
      <div>area {country.area} </div>
      <br />
      <div>
        <strong>languages:</strong>
        <ul>{languages}</ul>
      </div>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  );
};

const Countries = ({ countries, showCountry }) => {
  console.log(countries);

  const countryList =
    countries.length > 10 ? (
      <div>Too many matches, specify another country</div>
    ) : (
      countries.map((country) => (
        <div key={country.name.common}>
          {country.name.common}
          <button onClick={() => showCountry(country)}>show</button>
        </div>
      ))
    );

  const toRender =
    countryList.length === 1 ? <Country country={countries[0]} /> : countryList;

  return <div>{toRender}</div>;
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("Pal");

  useEffect(() => {
    countryServices.getAll().then((countries) => {
      setCountries(countries);
    });
  }, []);

  const changeFilter = (e) => {
    setFilter(e.target.value);
  };

  const showCountry = (country) => {
    setFilter(country.name.common);
  };

  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <form>
        find countries <input value={filter} onChange={changeFilter} />
      </form>

      <Countries countries={countriesToShow} showCountry={showCountry} />
    </div>
  );
};

export default App;
