import React from 'react';
import StatusIndicator from '../sensor-details/status-indicator';
import StatusDetails from '../sensor-details/status-details';
const SensorListItem = ({ sensor, toggleSensor }) => (
    <tr>
        <td className="sensor-list_body"><div className={'sensor-details_input ' + (sensor.selected ? 'selected' : '')} onClick={() => toggleSensor(sensor.name)}></div></td>
        <td className="sensor-list_body">
            <StatusDetails sensor={sensor} toggleSensor={toggleSensor} />
        </td>
        <td className="sensor-list_body"><StatusIndicator {...sensor.health} /></td>
    </tr>
)

export default SensorListItem;
