import React from 'react';
import SensorListActions from './sensor-list-actions';
import SensorListHeader from './sensor-list-header';
import SensorListItem from './sensor-list-item';
import MessagePanels from '../message-panels';

const SensorList = ({ startJob, operations, sensors, toggleSensor, enableStartJob, selectOperation, errors, selectedOperationError }) => (
    <div className="app-main">
        <SensorListActions selectedOperationError={selectedOperationError} operations={operations} startJob={startJob} enableStartJob={enableStartJob} selectOperation={selectOperation} />
        <MessagePanels {...errors}  />
        <table className='sensor-list'>
            <tbody>
                <SensorListHeader />
                {
                    sensors.map(element => <SensorListItem key={element.name} sensor={element} toggleSensor={toggleSensor} />)
                }
            </tbody>
        </table>

    </div>
)

export default SensorList;