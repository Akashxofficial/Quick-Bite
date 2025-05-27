import React from 'react';
import { useParams } from 'react-router-dom';
import LiveMap from '../../components/LiveMap'; // ✅ Corrected path
import './TrackOrder.css';

const TrackOrder = () => {
  const { id } = useParams();

  const riderLocation = { lat: 26.9124, lng: 75.7873 };
  const userLocation = { lat: 26.9224, lng: 75.8020 };

  return (
    <div className="track-order-container">
      <h2 style={{ textAlign: 'center', padding: '1rem' }}>
        Tracking Your Order #{id}
      </h2>

      <LiveMap
        riderLocation={riderLocation}
        userLocation={userLocation}
      />
    </div>
  );
};

export default TrackOrder;
