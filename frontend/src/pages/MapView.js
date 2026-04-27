import React, { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
// Importing the initialized database from Ritam's config
import { db } from '../firebase/config'; 
import { collection, onSnapshot } from 'firebase/firestore';

const API_KEY = 'AIzaSyANi3rLfhXI0FHQTAwADhu9ZqpXVqpjQjY'; 

export default function MapView() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // This listens for any changes in the 'needs' collection
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
      <h2 style={{ margin: "20px 0" }}>Live Impact Map</h2>
      <div style={{ height: '75vh', width: '95%', margin: '0 auto', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <APIProvider apiKey={API_KEY}>
          <Map
            defaultCenter={{ lat: 22.5726, lng: 88.3639 }}
            defaultZoom={12}
            mapId={'DEMO_MAP_ID'}
          >
            {locations.map((loc) => (
              // Only show marker if lat and lng exist to avoid errors
              loc.lat && loc.lng && (
                <AdvancedMarker 
                  key={loc.id} 
                  position={{ lat: Number(loc.lat), lng: Number(loc.lng) }}
                >
                  <Pin 
                    background={loc.type === 'volunteer' ? '#34a853' : '#ea4335'} 
                    glyphColor={'#FFF'} 
                    borderColor={'#000'} 
                  />
                </AdvancedMarker>
              )
            ))}
          </Map>
        </APIProvider>
      </div>
    </div>
  );
}