
import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import SensorListController from '../components/list-controller';
import Mock from './mock-component';

Enzyme.configure({ adapter: new Adapter() });

const mockDataService = {
  getReaders: function () {
    return Promise.resolve([{
      name: 'xArray-11-3f-5f',
      type: 'xArray',
      address: '10.0.0.2'
    },
    {
      name: 'xArray-11-3d-ac',
      type: 'xArray',
      address: '10.0.0.3'
    },
    {
      name: 'xArray-11-3f-4c',
      type: 'xArray',
      address: '10.0.0.4'
    },])
  },
  getHealth: function () {
    return Promise.resolve([{
      reader: 'xArray-11-3f-5f',
      status: 'ERROR',
      message: 'Lost communication',
    },
    {
      reader: 'xArray-11-3f-4c',
      status: 'WARNING',
      message: 'Inconsistent connection with antenna 1',
    },])
  },
  getOperations: function () {
    return Promise.resolve(['inventory'])
  },
}

describe('<SensorListController />', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');

    const WrappedSensorContoller = SensorListController(Mock);
    ReactDOM.render(<WrappedSensorContoller dataManager={mockDataService} />, div);
  });

});
