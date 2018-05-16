import * as Firebase from 'firebase'

var config = {
    apiKey: "AIzaSyAjEnqRnv8o37qq6Uffm7CdepHdzKXqVNE",
    authDomain: "newsapp-ef9e0.firebaseapp.com",
    databaseURL: "https://newsapp-ef9e0.firebaseio.com",
    projectId: "newsapp-ef9e0",
    storageBucket: "newsapp-ef9e0.appspot.com",
    messagingSenderId: "596985522923",
  };
 
  export const firebaseRef = Firebase.initializeApp(config);
  