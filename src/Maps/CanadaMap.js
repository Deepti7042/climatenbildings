import React from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import canadaMap from './Canada-provinces.json'; // Update path accordingly
import climateData from './climate_data.json'; // Update path accordingly
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import './CanadaMap.css'; // Ensure you have styles for .tooltip

const CanadaMap = () => {
    return (
        <MapContainer center={[56.1304, -106.3468]} zoom={4} style={{ height: '900px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {climateData.map((city, index) => (
                <Circle
                    key={index}
                    center={[city.Latitude, city.Longitude]}
                    radius={50000} // Adjust radius as needed
                    fillOpacity={0.5}
                    color="blue"
                    onMouseOver={(e) => {
                        e.target.openPopup();
                    }}
                    onMouseOut={(e) => {
                        e.target.closePopup();
                    }}
                >
                    <Popup>
                        <div>
                            <p>City: {city.city}</p>
                            <p>Temperature: {city.Temperature}°C</p>
                            <p>Snowfall: {city.Snowfall}mm</p>
                            <p>Precipitation: {city.Precipitation}mm</p>
                        </div>3
                    </Popup>
                </Circle>
            ))}
        </MapContainer>
    );
};

export default CanadaMap;
