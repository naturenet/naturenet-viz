var firebase = require('firebase/app');
require('firebase/database')
require('firebase/auth')

var config = {
    apiKey: "AIzaSyChM0Tmrj_K_SJd4IqQBlOfzDC61xMFguU",
    authDomain: "naturenet-testing.firebaseapp.com",
    databaseURL: "https://naturenet-testing.firebaseio.com",
    storageBucket: "naturenet-testing.appspot.com",
  };
firebase.initializeApp(config);
