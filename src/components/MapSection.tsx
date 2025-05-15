'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import type { LatLngExpression } from 'leaflet'

const center: LatLngExpression = [51.505, -0.09]; 

const MapSection = () => {
  return (
    <section className='relative w-full flex flex-col items-center my-20 '>
      <div className='w-[90%] 2xl:w-4/5 rounded-xs'>
        <h1 className='text-[#f5ffff] text-5xl font-bold mb-10 '>
          Find cheap flights from United States to anywhere
        </h1>
        <MapContainer
          center={center}
          zoom={3}
          style={{ height: '500px', width: '100%', borderRadius: ".5rem" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={center}>
            <Popup>
              Example Airport<br />London.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  );
};

export default MapSection;
