import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import './LiveMap.css';

const containerStyle = {
  width: '100%',
  height: '300px',
};

const center = {
  lat: 28.6139,
  lng: 77.209,
};

// Route coordinates
const routePath = [
  { lat: 28.6139, lng: 77.209 },
  { lat: 28.6155, lng: 77.210 },
  { lat: 28.6180, lng: 77.211 },
  { lat: 28.6200, lng: 77.212 },
  { lat: 28.6230, lng: 77.213 },
  { lat: 28.6255, lng: 77.214 },
  { lat: 28.6280, lng: 77.215 },
  { lat: 28.6300, lng: 77.215 },
];

// Custom white map style
const customMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
  { featureType: "road", stylers: [{ color: "#ffffff" }] },
  { featureType: "water", stylers: [{ color: "#c9c9c9" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
];

const LiveMap = () => {
  const [riderPosition, setRiderPosition] = useState(routePath[0]);
  const [step, setStep] = useState(0);

  // Animate rider along the path
  useEffect(() => {
    const interval = setInterval(() => {
      if (step < routePath.length - 1) {
        setStep((prev) => prev + 1);
        setRiderPosition(routePath[step + 1]);
      }
    }, 35000); // update every 2 sec

    return () => clearInterval(interval);
  }, [step]);

  return (
    <div className="map-container">
      <LoadScript googleMapsApiKey="AIzaSyBh5HEGkvshKVuCTHvLdX9hTJ08bV8Nh8w">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          options={{
            styles: customMapStyle,
            disableDefaultUI: true,
            zoomControl: true,
          }}
        >
          {/* Start Marker */}
          <Marker position={routePath[0]} />

          {/* End Marker */}
          <Marker position={routePath[routePath.length - 1]} />

          {/* Rider Marker (bike icon) */}
          <Marker
           position={riderPosition}
           icon={
             window.google?.maps
               ? {
                   url: '/new.png',
                   scaledSize: new window.google.maps.Size(40, 40),
                 }
               : undefined
           }
            
          />

          {/* Route line */}
          <Polyline
            path={routePath}
            options={{ strokeColor: '#FF0000', strokeWeight: 4 }}
          />
        </GoogleMap>
      </LoadScript>

      <div className="tracking-card">
        <h4>Tracking Order</h4>
        <p>INVOICE: 12A394</p>
        <p>Arriving Soon...</p>
        <div className="actions">
          <button>📩 Message</button>
          <button>📞 Call Driver</button>
        </div>
        <button className="details-btn">ORDER DETAILS</button>
      </div>
    </div>
  );
};

export default LiveMap;
