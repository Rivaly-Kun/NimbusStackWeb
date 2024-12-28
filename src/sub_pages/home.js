import React, { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../pages/config/firebaseClient.js";

const Home = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [mapError, setMapError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeLayerIndex, setActiveLayerIndex] = useState(null); // Tracks active layer index
  const [cityMarkers, setCityMarkers] = useState([]); // Tracks city markers
  const mapRef = React.useRef(null);

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
          `script[src="https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places"]`
        );

        if (!existingScript) {
          const script = document.createElement("script");
          script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
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
        zoom: 5,
      };

      const map = new window.google.maps.Map(document.getElementById("map"), mapOptions);
      mapRef.current = map;

      // Add base marker
      const marker = new window.google.maps.Marker({
        position: coordinates,
        map: map,
        title: "Custom Location",
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: "<h3>Custom Location</h3><p>This marker is dynamically loaded from Firebase.</p>",
      });

      marker.addListener("click", () => infoWindow.open(map, marker));

      // Fetch city data dynamically
      fetchCityData(map, coordinates);
    } else {
      setMapError("Google Maps API is not loaded.");
    }
  };

  const fetchCityData = (map, coordinates) => {
    const locations = [
      { lat: coordinates.lat + 1, lng: coordinates.lng + 1 }, // Example nearby locations
      { lat: coordinates.lat - 1, lng: coordinates.lng - 1 },
    ];

    const service = new window.google.maps.places.PlacesService(map);

    locations.forEach((location) => {
      const request = {
        location,
        radius: 50000, // 50 km search radius
        type: ["locality"], // Look for cities
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
          const city = results[0];
          const cityName = city.name;
          const heatIndex = Math.floor(Math.random() * 50) + 10; // Randomized for now

          setCityMarkers((prevMarkers) => [
            ...prevMarkers,
            {
              name: cityName,
              lat: location.lat,
              lng: location.lng,
              heatIndex,
            },
          ]);
        }
      });
    });
  };

  useEffect(() => {
    if (window.google && mapRef.current && cityMarkers.length > 0) {
      cityMarkers.forEach((city) => {
        const { lat, lng, name, heatIndex } = city;

        const marker = new window.google.maps.Marker({
          position: { lat, lng },
          map: mapRef.current,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 0, // Hide default marker icon
          },
        });

        const customLabel = `
          <div style="display: flex; align-items: center; background-color: #FFA726; color: #fff; padding: 4px 8px; border-radius: 5px; box-shadow: 0px 2px 4px rgba(0,0,0,0.2);">
            <span style="background-color: #444; padding: 2px 6px; border-radius: 3px; font-size: 12px; font-weight: bold; margin-right: 5px;">${heatIndex}</span>
            <span style="font-size: 14px; font-weight: bold;">${name}</span>
          </div>
        `;

        const infoWindow = new window.google.maps.InfoWindow({
          content: customLabel,
        });

        infoWindow.open(mapRef.current, marker);
      });
    }
  }, [cityMarkers]);

  const addWeatherLayer = (layerName) => {
    if (!mapRef.current) return;

    // Remove the current active layer if one exists
    if (activeLayerIndex !== null) {
      mapRef.current.overlayMapTypes.removeAt(activeLayerIndex);
    }

    // Add the new layer
    const layer = new window.google.maps.ImageMapType({
      getTileUrl: (coord, zoom) => {
        return `https://tile.openweathermap.org/map/${layerName}/${zoom}/${coord.x}/${coord.y}.png?appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;
      },
      tileSize: new window.google.maps.Size(256, 256),
      name: layerName,
    });

    mapRef.current.overlayMapTypes.push(layer);
    setActiveLayerIndex(mapRef.current.overlayMapTypes.getLength() - 1); // Update the index of the active layer
  };

  return (
    <div className="map-container">
      <h3>Welcome to the Home section!</h3>
      {mapError && <p className="error-text">{mapError}</p>}
      <div id="map" className="map"></div>
      <div className="weather-layer-selector">
        <select onChange={(e) => addWeatherLayer(e.target.value)} defaultValue="">
          <option value="" disabled>
            Select Weather Layer
          </option>
          <option value="clouds_new">Clouds</option>
          <option value="precipitation_new">Precipitation</option>
          <option value="pressure_new">Sea Level Pressure</option>
          <option value="wind_new">Wind Speed</option>
          <option value="temp_new">Temperature</option>
        </select>
      </div>
    </div>
  );
};

export default Home;
