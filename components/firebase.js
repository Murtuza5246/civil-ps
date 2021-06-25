//eslint

import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAkqD9RTElVzd9Zo_DHZLcgLDROTfj3XnE",
  authDomain: "ssr-problemspotter.firebaseapp.com",
  databaseURL: "https://ssr-problemspotter.firebaseio.com",
  projectId: "ssr-problemspotter",
  storageBucket: "ssr-problemspotter.appspot.com",
  messagingSenderId: "8365839315",
  appId: "1:8365839315:web:f5d96170d97b9b05c19526",
  measurementId: "G-MZEEE7KQNV",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
