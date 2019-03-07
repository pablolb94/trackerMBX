import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { setInterval } from 'timers';

const startApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
  serviceWorker.unregister(); 
};

const geolocation= () => {
  window.BackgroundGeolocation.configure({
    locationProvider: window.BackgroundGeolocation.ACTIVITY_PROVIDER,
    desiredAccuracy: window.BackgroundGeolocation.HIGH_ACCURACY,
    stationaryRadius: 10,
    interval: 1000,
    activitiesInterval: 1000,
    /*
    stationaryRadius: 50,
    distanceFilter: 50,
    notificationTitle: 'Background trackingg',
    notificationText: 'enabled',
    debug: true,
    interval: 3000,
    fastestInterval: 5000,
    activitiesInterval: 3000,
    */
  });
}

if(window.cordova) {
  document.addEventListener('deviceready', function(){
    startApp();
    geolocation();
  }, false);
} else {
  startApp();
}

