import firebase from "firebase"

var firebaseConfig = {
  apiKey: "AIzaSyBMxNifYxfO_LpWj3fNo0MHYLNMJTJStsM",
  authDomain: "hospitals-6e375.firebaseapp.com",
  databaseURL: "https://hospitals-6e375-default-rtdb.firebaseio.com",
  projectId: "hospitals-6e375",
  storageBucket: "hospitals-6e375.appspot.com",
  messagingSenderId: "858920717767",
  appId: "1:858920717767:web:4f4a5f8881076ebf939de2"
};


 if(!firebase.apps.length){ 
  firebase.initializeApp(firebaseConfig);
  }

export default  firebase.firestore()         