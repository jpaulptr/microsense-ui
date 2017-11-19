
import React, { Component } from 'react';

const dropDownText = 'Select Operation';
const sensorError = { message: 'Warning: you have selected a sensor that is in an error state. You cannot start a job with it.' };
const sensorInconsistency = { message: 'Warning: One or more of your sensors is in an inconsistent state and should be investigated.' };
const apiConnectionError = { message: 'ERROR: Could connect to the api' };

const errorCode = 'ERROR';
const wariningCode = 'WARNING';
const selectedOperationError = 'You must select an operation';

const hasSensorError = (sensors) => sensors.filter((ele) => ele.health.status === errorCode && ele.selected).length > 0;
const hasSensorInconsistency = (sensors) => sensors.filter((ele) => ele.health.status === wariningCode && ele.selected).length > 0;

const SensorListController = (WrappedComponent) => {
    return class SensorListController extends Component {
        constructor(dataManager) {
            super();
            this.dataManager = dataManager.dataManager;
            this.componentDidMount = this.componentDidMount.bind(this);
            this.startJob = this.startJob.bind(this);
            this.toggleSensor = this.toggleSensor.bind(this);
            this.selectOperation = this.selectOperation.bind(this);

            this.state = {
                sensors: [],
                operations: [],
                enableStartJob: false,
                countOfSelected: 0,
                selectedOperation: dropDownText,
                selectedOperationError: '',
                errors: {
                    sensorError: null,
                    sensorInconsistency: null,
                    apiConnectionError: null,
                },
            }
        }

        componentDidMount() {
            this.dataManager.getReaders().then((result) => {
                const errors = this.state.errors;
                errors.apiConnectionError = null;

                this.setState({
                    sensors: result,
                })

                this.dataManager.getHealth().then((health) => {
                    const sensors = [...this.state.sensors];
                    sensors.forEach((element) => {
                        element.health = health.find(ele => ele.reader === element.name) || {}
                    });

                    const errors = this.state.errors;
                    errors.apiConnectionError = null;

                    this.setState({ sensors, errors });
                })
            }).catch(() => {
                const errors = this.state.errors;
                errors.apiConnectionError = apiConnectionError;
                this.setState({ errors });
            })


            this.dataManager.getOperations().then((result) => {
                this.setState({
                    operations: [dropDownText, ...result],
                });
            }).catch((error)=>{
                
            });

        }

        startJob(e) {
            const readers = this.state.sensors.filter(element => element.selected && element.health.status !== errorCode)
                .map(element => element.name)

            if (this.state.selectedOperation === dropDownText) {
                this.setState({selectedOperationError});
                return;
            }

            this.dataManager.sendJobs({
                operation: this.state.selectedOperation,
                readers,
            }).then((result) => {
                console.log(result)
            }).catch(() => {

            });
        }

        toggleSensor(sensorName) {
            // Fix this so it doesn't over update...
            const sensors = [...this.state.sensors];
            const selectedSensor = sensors.find((element) => element.name === sensorName)

            let countOfSelected = this.state.countOfSelected;
            let enableStartJob = this.state.enableStartJob;

            if (selectedSensor) {
                selectedSensor.selected = !selectedSensor.selected;
                let status = selectedSensor.health && selectedSensor.health.status;
                const errors = { ...this.state.errors };

                // Determine if there are any sensor inconsistencies
                if (hasSensorInconsistency(sensors)) {
                    errors.sensorInconsistency = sensorInconsistency;
                } else {
                    errors.sensorInconsistency = null;
                }

                // determine if any sensors are still in error state
                if (hasSensorError(sensors)) {
                    errors.sensorError = sensorError;
                } else {
                    errors.sensorError = null;
                }

                if (status !== 'ERROR') {
                    // update the selected sensor count
                    selectedSensor.selected ? countOfSelected++ : countOfSelected--;
                    enableStartJob = countOfSelected > 0;

                    this.setState({
                        sensors,
                        countOfSelected,
                        enableStartJob,
                        errors,
                    });
                } else {
                    this.setState({ sensors, errors });
                }


            }
        }

        selectOperation(e) {
            this.setState({
                selectedOperation: e.target.value,
               selectedOperationError: '',
            });
        }
        render() {
            return (
                <WrappedComponent {...this.state} toggleSensor={this.toggleSensor} startJob={this.startJob} selectOperation={this.selectOperation} />
            )
        }
    }

}
export default SensorListController;