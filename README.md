## MicroSense UI

### Install & Run
To install run

```npm install```

To start the app run

```npm start```

The command line will need you to agree to what port you are using (mostlikely localhost:3001). It should open a browser window automatically.

It assumes the api is running on localhost:3000 and will try to connecto to that address. 

To run any tests 

```npm test```



### Design
The MicroSense app is built with react.js using the create react app for project setup.

The project has the following components:
* App.js - the entry point of the application. It is responsible for passing the correct data providers to the list controller. 
* /components/list-controller.js - The state store of the application. It is a react component that maintains state, and coordinates data access for all other components. The idea is that there is only one state store and all child components will just receive data updates; thus, making all child components stateless. The component uses the fact that in react any update to state will fire a rerender. The controller takes both the data provider and the child component as parameters for two reasons: one, to enforce separation of concerns and allow for unit testing; two, to possibly allow reuses (for example, it might be possible to reuse much of the logic for a sensor detail page).
* /api/api.js - a wrapper of the fetch api. Allows for customization of api calls across the whole app.
* /api/readers-service.js - A wrapper for the actual route definitions for the api calls. Any component that calls the api would use this service. Injecting the service into the component makes it easier to unit test.
* /components/sensor-details/ - The components that handle the display logic for the sensors. They are decoupled from layout and have no state. They could possibly be reused on a sensor detail page.
* /components/sensor-list/ - The components that set up the layout of the sensor list. 
* /components/sensor-list/sensor-list-actions.js - Contains the operations drop down and the start job button. The only event logic it has is to invoke the functions that were passed from the list-controller.
