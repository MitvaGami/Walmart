// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import './App.css';

// A helper component to change the map's view dynamically
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function App() {
  const [risks, setRisks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // New state to control the map's center and zoom
  const [mapCenter, setMapCenter] = useState([39.82, -98.57]); // Initial center of the US
  const [mapZoom, setMapZoom] = useState(4); // Initial zoom

  // Fetch the REAL data from our smart backend
  useEffect(() => {
    const fetchRisks = async () => {
      try {
        setLoading(true);
        console.log("Fetching smart risks from backend...");
        const response = await axios.get('http://localhost:5000/api/risks');
        setRisks(response.data);
        console.log("Successfully fetched smart risks:", response.data);
      } catch (error) {
        console.error("Error fetching smart risks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRisks();
  }, []); // The empty array ensures this runs only once on load

  // --- The "Wow" Factor: Function to handle clicking a risk in the list ---
  const handleRiskClick = (risk) => {
    // When a risk is clicked, update the map's center and zoom level
    setMapCenter([risk.lat, risk.lon]);
    setMapZoom(10); // Zoom in closer to the selected risk
  };

  return (
    <div className="App">
      <div className="risk-feed-panel">
        <h1>Walmart Risk Radar</h1>
        <h2>Live Risks Feed</h2>
        {loading ? (
          <p>Analyzing global news...</p>
        ) : (
          <ul>
            {risks.length > 0 ? (
              risks.map((risk) => (
                <li key={risk.id} onClick={() => handleRiskClick(risk)} className="risk-item">
                  <strong>{risk.title}</strong>
                  <p>Location: {risk.locationName}</p>
                  <p>Source: {risk.sourceName}</p>
                </li>
              ))
            ) : (
              <p>No immediate supply chain risks detected in key locations.</p>
            )}
          </ul>
        )}
      </div>
      <div className="map-panel">
        <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100vh', width: '100%' }}>
          {/* This special component will handle our dynamic view changes */}
          <ChangeView center={mapCenter} zoom={mapZoom} />

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {risks.map(risk => (
            <Marker key={risk.id} position={[risk.lat, risk.lon]}>
              <Popup>
                <strong>{risk.locationName}</strong><br />
                {risk.title}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;