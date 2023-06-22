import "./App.css";
import { useState } from "react";
import { Sun, Storm, Clouds, Wind, Thermometer, Humidity } from "./assets";

function App() {
  const [data, setData] = useState({
    name: "Delhi",
    temp: 300,
    countryName: "IN",
    windSpeed: 2,
    pressure: 10,
    humidity: 40,
    weather: "Clear Sky",
    imgPath: Sun,
  });
  const [search, setSearch] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search != "") {
      const apiKey = "a6c393cfc940d61bc7c159f767daa108";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`;

      fetch(url)
        .then((res) => res.json())
        .then((resData) => {
          let imgPath = Sun;
          if (resData.weather[0].main === "Clear Sky") {
            imgPath = Sun;
          } else if (resData.weather[0].main === "Haze") {
            imgPath = Clouds;
          } else if (resData.weather[0].main === "Rain") {
            imgPath = Storm;
          }
          setData({
            ...data,
            name: resData.name,
            temp: resData.main.temp,
            countryName: resData.sys.country,
            windSpeed: resData.wind.speed,
            pressure: resData.main.pressure,
            humidity: resData.main.humidity,
            weather: resData.weather[0].main,
            imgPath,
          });
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="app">
      <div className="weather-app">
        <div className="navbar">
          <h2 className="nav-heading">{data.weather}</h2>
          <form onSubmit={handleSubmit} className="nav-search">
            <input type="text" onChange={(e) => setSearch(e.target.value)} />
            <button className="search-btn" type="submit">
              Go
            </button>
          </form>
        </div>
        <div className="weather-section">
          <img
            src={data.imgPath}
            alt="weather condition"
            className="weather-img"
          />
          <h1 className="weather-temp">{Math.floor(data.temp - 273)} °C</h1>
          <h2 className="weather-city">
            {data.name}, {data.countryName}
          </h2>
        </div>
        <div className="bottom-section">
          <div className="section">
            <img src={Wind} alt="wind speed" className="img" />
            <p>Wind Speed</p>
            <h4>{Math.round(data.windSpeed)} mph</h4>
          </div>
          <div className="section">
            <img src={Thermometer} alt="wind speed" className="img" />
            <p>Pressure</p>
            <h4>{data.pressure} pa</h4>
          </div>
          <div className="section">
            <img src={Humidity} alt="wind speed" className="img" />
            <p>Humidity</p>
            <h4>{data.humidity} ppm</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
