// import React, { useState, useEffect } from "react";
// import "./currentWeather.scss";
// import windImg from "../../assets/images/wind.png";
// import humidityImg from "../../assets/images/humidity.png";
// import visibilityImg from "../../assets/images/visibility.png";

// const CurrentWeather = ({ data }) => {
//   const [weatherIcon, setWeatherIcon] = useState(null);

//   useEffect(() => {
//     if (data?.weather?.[0]?.icon) {
//       import(`../../assets/images/weather-foto/${data.weather[0].icon}.png`)
//         .then((icon) => setWeatherIcon(icon.default))
//         .catch(() => setWeatherIcon(null)); // Set to null if the image is not found
//     }
//   }, [data]);

//   if (!data) {
//     return null;
//   }

//   return (
//     <div className="weather">
//       <div className="bottom">
//         {/* Temperature Section */}
//         <div className="first-section-weather">
//           <div className="parameter-row">
//             <h1 className="Temperature">
//               {Math.round(data.main.temp - 273.15)}°C
//             </h1>
//             <span className="parameter-label">Feels like </span>
//             <span className="parameter-value">
//               {Math.round(data.main.feels_like - 273.15)}°C
//             </span>
//           </div>
//         </div>

//         {/* Weather Icon & Description Section */}
//         <div className="second-section-weather">
//           {weatherIcon && (
//             <img
//               src={weatherIcon}
//               alt="weather"
//               className="weather-icon"
//               style={{ filter: "brightness(0) invert(1)" }}
//             />
//           )}
//           <p className="weather-description">{data.weather[0].main}</p>
//         </div>

//         {/* Wind, Humidity, Visibility Section */}
//         <div className="third-section-weather">
//           <div className="parameter-row">
//             <img src={windImg} alt="Wind Icon" />
//             <p className="parameter-value">{data.wind.speed} m/s</p>
//           </div>
//           <div className="parameter-row">
//             <img src={humidityImg} alt="Humidity Icon" />
//             <p className="parameter-value">{data.main.humidity} g/kg</p>
//           </div>
//           <div className="parameter-row">
//             <img src={visibilityImg} alt="Visibility Icon" />
//             <p className="parameter-value">{data.visibility} m</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CurrentWeather;


import React, { useState, useEffect } from "react";
import "./currentWeather.scss";
import windImg from "../../assets/images/wind.png";
import humidityImg from "../../assets/images/humidity.png";
import visibilityImg from "../../assets/images/wisibility.png";

const CurrentWeather = ({ data }) => {
  const [weatherIcon, setWeatherIcon] = useState(null);

  useEffect(() => {
    if (data?.weather?.[0]?.icon) {
      import(`../../assets/images/weather-foto/${data.weather[0].icon}.png`)
        .then((icon) => setWeatherIcon(icon.default))
        .catch(() => setWeatherIcon(null)); // Set to null if the image is not found
    }
  }, [data]);

  if (!data) {
    return null;
  }

  return (
    <div className="weather">
      <div className="bottom">
        {/* Temperature Section */}
        <div className="first-section-weather">
          <div className="parameter-row">
            <h1 className="Temperature">
              {Math.round(data.main.temp - 273.15)}°C
            </h1>
            <span className="parameter-label">Feels like </span>
            <span className="parameter-value">
              {Math.round(data.main.feels_like - 273.15)}°C
            </span>
          </div>
        </div>

        {/* Weather Icon & Description Section */}
        <div className="second-section-weather">
          {weatherIcon && (
            <img
              src={weatherIcon}
              alt="weather"
              className="weather-icon"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          )}
          <p className="weather-description">{data.weather[0].main}</p>
        </div>

        {/* Wind, Humidity, Visibility Section */}
        <div className="third-section-weather">
          <div className="parameter-row">
            <img src={windImg} alt="Wind Icon" />
            <p className="parameter-value">{data.wind.speed} m/s</p>
          </div>
          <div className="parameter-row">
            <img src={humidityImg} alt="Humidity Icon" />
            <p className="parameter-value">{data.main.humidity} g/kg</p>
          </div>
          <div className="parameter-row">
            <img src={visibilityImg} alt="Visibility Icon" />
            <p className="parameter-value">{data.visibility} m</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
