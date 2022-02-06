import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC3Ux0603iL9QN7w5YpD-489vlMDe3dFlk",
    authDomain: "money-tracker-61233.firebaseapp.com",
    projectId: "money-tracker-61233",
    storageBucket: "money-tracker-61233.appspot.com",
    messagingSenderId: "475549265523",
    appId: "1:475549265523:web:afc070b10be8787d888406",
};

//init firebase

firebase.initializeApp(firebaseConfig);

//init service

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
//timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };