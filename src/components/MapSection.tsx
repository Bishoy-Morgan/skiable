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
    <section className='relative w-full flex flex-col items-center my-20 bg-transparent '>
      <div className='w-[90%] 2xl:w-4/5 rounded-xl max-w-7xl'>
        <h2 className='mb-10 max-w-xl'>
          Find cheap flights from United States to anywhere
        </h2>
        <p className='para-14 mb-10 max-w-2xl !font-medium '>
          Search, compare, and book flights from anywhere in the U.S. to any destination worldwide instantly access hundreds of airlines, flexible options, and the lowest available prices, all in one seamless experience.
        </p>
        <MapContainer
          center={center}
          zoom={3}
          style={{ height: '300px', width: '100%', borderRadius: ".5rem" }}
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
