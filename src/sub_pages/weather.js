import React, { useState } from "react";
import { MapContainer, TileLayer, LayersControl, useMapEvents, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-control-custom";

const WeatherMap = () => {
  const apiKey = "49e904c9f82ee4c0be453f8657089c41";

  // Coordinates for the Philippines
  const philippinesCoordinates = [12.8797, 121.7740]; // Latitude, Longitude
  const zoomLevel = 6;

  // Weather Map Layers
  const weatherLayers = {
    Temperature: `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`,
    Precipitation: `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`,
    Clouds: `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`,
    Pressure: `https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${apiKey}`,
    Wind: `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${apiKey}`,
  };

  // Example Cities (Replace with API for real data)
  const exampleCities = [
    { name: "Cebu City", coordinates: [10.3157, 123.8854], weather: "Rainy, 26°C" },
    { name: "Manila", coordinates: [14.5995, 120.9842], weather: "Cloudy, 28°C" },
    { name: "Davao City", coordinates: [7.1907, 125.4553], weather: "Clear, 30°C" },
  ];

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer center={philippinesCoordinates} zoom={zoomLevel} style={{ height: "70%", width: "70%" }}>
        {/* Base Map Layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Weather Map Layers */}
        <LayersControl position="topright">
          {Object.entries(weatherLayers).map(([layerName, layerUrl]) => (
            <LayersControl.Overlay key={layerName} name={layerName} checked={layerName === "Temperature"}>
              <TileLayer url={layerUrl} attribution='Weather data &copy; <a href="https://openweathermap.org/">OpenWeather</a>' />
            </LayersControl.Overlay>
          ))}
        </LayersControl>

        {/* Example City Markers */}
        {exampleCities.map((city, index) => (
          <Marker key={index} position={city.coordinates}>
            <Popup>
              <strong>{city.name}</strong>
              <br />
              {city.weather}
            </Popup>
          </Marker>
        ))}

        {/* Custom Control for Weather Info (Legend, etc.) */}
        <CustomControl />
      </MapContainer>
    </div>
  );
};

// Custom Control for Weather Legend
const CustomControl = () => {
  const map = useMapEvents({});
  L.control
    .custom({
      position: "bottomleft",
      content:
        '<div style="padding: 10px; background: white; border-radius: 8px; box-shadow: 0px 2px 5px rgba(0,0,0,0.3); font-size: 12px;">' +
        '<strong>Legend:</strong><br />' +
        '<span style="color: blue;">Temperature</span><br />' +
        '<span style="color: green;">Precipitation</span><br />' +
        '<span style="color: gray;">Clouds</span><br />' +
        '<span style="color: orange;">Pressure</span><br />' +
        '<span style="color: purple;">Wind</span>' +
        "</div>",
    })
    .addTo(map);
  return null;
};

export default WeatherMap;
