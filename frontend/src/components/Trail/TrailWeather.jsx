import React from "react";
import Weather from "../Weather/Weather";
import "./trailWeather.scss";

const TrailWeather = ({ trail }) => {
  return (
    <div>
      <div
        className="weather-and-extra-informations"
        style={{
          display: "flex",
          marginTop: "20px",
          marginBottom: "20px",
          marginRight: "20px",
          marginLeft: "20px",
        }}
      >
        <div style={{ flex: "1", marginRight: "10px" }}>
          <Weather location={trail.location}/>
        </div>
      </div>
    </div>
  );
};

export default TrailWeather;
