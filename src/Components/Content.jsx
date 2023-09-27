import axios from "axios";
import { useState, useEffect } from "react";
import {BsWind,BsDroplet} from 'react-icons/bs'
const Content = ({ country, setCountry }) => {
  if (country.length > 10 || country.length == 0) {
    return <p>Too many matches, specify another filter</p>;
  } else if (country.length > 1) {
    return (
      <div>
        {country.map((p, i) => (
          <div key={i}>
            {p.name.common}{" "}
            <button onClick={() => setCountry([p])}>Show</button>{" "}
          </div>
        ))}
      </div>
    );
  } else {
    const [Weather, setWeather] = useState([]);
    const URLW = `https://api.openweathermap.org/data/2.5/weather?q=${country[0].capital}&appid=5069c386b14c5622a25d61159d4f9b89`;
    console.log('URLW', URLW)
    useEffect(() => {
      axios.get(URLW).then((Response) => setWeather(Response.data));
    }, []);

    return (
      <div className=''>
        {country.map((country, i) => {
          let element = [];
          for (const lang in country.languages) {
            if (
              country.languages.hasOwnProperty.call(country.languages, lang)
            ) {
              element.push(country.languages[lang]);
            }
          }
          return (
            <div key={i} >
              <div className="flex justify-between font-karla">
                <h1 className=' text-4xl'>{country.name.common} {country.flag}</h1>
                <p className="text-4xl">
                  {country.capital}  
                </p>
              </div>
              <br/>
              <br/>
              <div className=''>
                <span className=" text-9xl">
                  {Weather.main ? (
                    <div>
                      <span className="flex justify-center ml-7 mb-3 mt-7 font-montserrat"> {Math.round(Weather.main.temp - 273)}°</span>

                    </div>
                  ) : null}
                </span>
                
                  
                {Weather.weather ? (
                  <p className="flex justify-center text-3xl font-raleway mb-2">
                  {Weather.weather[0].main}
                  </p>
                ) : null}
                {Weather.wind ? <p className="flex justify-center items-center"> <BsWind className="mr-1"/> {Weather.wind.speed} m/s</p> : null}
                {Weather.wind ? <p className="flex justify-center items-center"> <BsDroplet className="mr-1"/> {Weather.main.humidity} %</p> : null}

              </div>
            </div>
          );
        })}
      </div>
    );
  }
};
export default Content;
