import React from 'react';

const statusTypes = {
    warning: 'WARNING',
    error: 'ERROR',
}

const calculateStatus = (status) => {
    switch (status) {
        case statusTypes.warning:
            return 'warning';
        case statusTypes.error:
            return 'error';
        default:
            return 'ok';
    }
}

const StatusIndicator = ({ status, message }) =>
    (
        <div className={'sensor-status ' + calculateStatus(status)}>
            <div className="sensor-status_icon"></div>
            <div>
                <div className="sensor-status_message">{status}</div>
                <div className="sensor-status_description">{message}</div>
            </div>
        </div>
    )


export default StatusIndicator;