var firebase = require('firebase/app');
require('firebase/database')
require('firebase/auth')

var config = {
   apiKey: "AIzaSyB_Nm4x_qQqB6toSi235F3sl5W27fLtGGc",
   authDomain: "nn-viz.firebaseapp.com",
   databaseURL: "https://nn-viz.firebaseio.com",
   storageBucket: "nn-viz.appspot.com",
 };
firebase.initializeApp(config);
