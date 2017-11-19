import React from 'react';

const MessagePanels = (props) => (
    <div className="error-panel_container"> {console.log(props)}
        {
            props.sensorError ?
                <div className="error-panel error">{props.sensorError.message}</div>
                : null
        }
        {
            props.sensorInconsistency ?
                <div className="error-panel warning">{props.sensorInconsistency.message}</div>
                : null
        }
        {
            props.apiConnectionError ?
                <div className="error-panel error">{props.apiConnectionError.message}</div>
                : null
        }
    </div>
)

export default MessagePanels;