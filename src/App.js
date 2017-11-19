import React, { Component } from 'react';
import SensorListContoller from './components/list-controller';
import SensorList from './components/sensor-list/sensor-list';
import readersService from './api/readers-service';
import './App.css';

const WrappedSensorContoller = SensorListContoller(SensorList);

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header"> 
          <h1 className="app-header_logo">MicroSense UI</h1>
        </header>
        
        <WrappedSensorContoller dataManager={readersService} />
      </div>
    );
  }
}

export default App;
