import React, { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../pages/config/firebaseClient.js"; // Import the app instance

const Home = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [mapError, setMapError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const database = getDatabase(app);

  useEffect(() => {
    const fetchMarkerData = async () => {
      try {
        const markerRef = ref(database, "Marker");
        const markerSnapshot = await get(markerRef);
 
        if (markerSnapshot.exists()) {
          const markerData = markerSnapshot.val();

          const { lat, lng } = markerData;
          if (lat && lng) {
            setCoordinates({ lat, lng });
            setMapError(null);
          } else {
            setMapError("Marker data does not contain lat and lng fields.");
          }
        } else {
          setMapError("No marker data available in Firebase.");
        }
      } catch (error) {
        setMapError("An error occurred while fetching marker data.");
      }
    };

    fetchMarkerData();
    setIsLoaded(true);
  }, [database]);

  useEffect(() => {
    if (coordinates) {
      const loadGoogleMaps = () => {
        const existingScript = document.querySelector(
          `script[src="https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}"]`
        );

        if (!existingScript) {
          const script = document.createElement("script");
          script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
          script.async = true;
          script.onload = () => initMap(coordinates);
          script.onerror = () => setMapError("Failed to load Google Maps script.");
          document.body.appendChild(script);
        } else {
          initMap(coordinates);
        }
      };

      loadGoogleMaps();
    }
  }, [coordinates]);

  const initMap = (coordinates) => {
    if (window.google && window.google.maps) {
      const mapOptions = {
        center: coordinates,
        zoom: 12,
      };

      const map = new window.google.maps.Map(document.getElementById("map"), mapOptions);

      const marker = new window.google.maps.Marker({
        position: coordinates,
        map: map,
        title: "Custom Location",
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: "<h3>Custom Location</h3><p>This marker is dynamically loaded from Firebase.</p>",
      });

      marker.addListener("click", () => infoWindow.open(map, marker));
    } else {
      setMapError("Google Maps API is not loaded.");
    }
  };

  return (
    <div>
      <h3>Welcome to the Home section!</h3>
      {mapError && <p style={{ color: "red" }}>{mapError}</p>}
      <div id="map" style={{ height: "500px", width: "100%" }}></div>
    </div>
  );
};

export default Home;
