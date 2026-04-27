import React, { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { db } from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export default function MapView() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'needs'), (snapshot) => {
      const needsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLocations(needsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ margin: "20px 0" }}>🌍 Live Impact Map</h2>

      <div style={{
        height: '75vh',
        width: '95%',
        margin: '0 auto',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <APIProvider apiKey={API_KEY}>
          <Map
            defaultCenter={{ lat: 22.5726, lng: 88.3639 }}
            defaultZoom={10}
          >
          {locations.map((loc) => {
            const lat = Number(loc.lat);
            const lng = Number(loc.lng);

            if (isNaN(lat) || isNaN(lng)) return null;

            return (
              <AdvancedMarker key={loc.id} position={{ lat, lng }}>
                <Pin background="#ea4335" glyphColor="#FFF" borderColor="#000" />
              </AdvancedMarker>
            );
          })}
          </Map>
        </APIProvider>
      </div>
    </div>
  );
}