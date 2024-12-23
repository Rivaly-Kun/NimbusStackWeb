import React, { useEffect, useState } from "react";
import { parse } from "pagasa-parser"; // Correctly import the parse function
import { wikipediaFormatter } from "@pagasa-parser/formatter-wikipedia"; // Import the formatter

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Use the parse function with the Wikipedia formatter
        const weather = await parse({ formatter: wikipediaFormatter });
        setWeatherData(weather); // Set the parsed weather data
      } catch (err) {
        setError("Failed to fetch or parse weather data.");
        console.error("Error:", err);
      }
    };

    fetchWeather(); // Fetch data on component mount
  }, []);

  return (
    <div>
      <h1>Welcome to the Home section!</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weatherData ? (
        <div>
          <h2>Current Weather Information</h2>
          {weatherData.map((item, index) => (
            <div key={index} style={{ marginBottom: "1em" }}>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Condition:</strong> {item.condition}</p>
              <p><strong>Temperature:</strong> {item.temperature}°C</p>
              <p><strong>Humidity:</strong> {item.humidity}%</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Home;
