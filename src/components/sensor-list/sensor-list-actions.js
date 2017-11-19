import React from 'react';

const SensorListActions = (props) => (
    <div className="sensor-actions">
        <div className="input_label input_container">Operations</div> 
        <div className="input_container">
        <select onChange={props.selectOperation} className="input_container">{
            props.operations.map((element) => (<option key={element} value={element}>{element}</option>))
        } </select> 
        </div>
        <div className="input_container">
        <button onClick={props.startJob} disabled={!props.enableStartJob}>Start Job</button>
        <span className="sensor-action_error">{props.selectedOperationError}</span>
        
        </div>
    </div>
)

export default SensorListActions;