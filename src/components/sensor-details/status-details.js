import React from 'react';
const SensorItem = ({ sensor, toggleSensor }) => (
    <div className="sensor-details">
        <div className="sensor-details_name">{sensor.name}</div>
        <div className="sensor-details_type">{sensor.type} </div>
        <div className="sensor-details_ip">{sensor.address} </div>
    </div>
)

export default SensorItem;
