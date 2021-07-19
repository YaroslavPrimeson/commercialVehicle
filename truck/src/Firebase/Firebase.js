import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyDOK8bMqWNflg6ROiuHEp8ofSzdSaCfSYw",
    authDomain: "trucks-noname.firebaseapp.com",
    projectId: "trucks-noname",
    storageBucket: "trucks-noname.appspot.com",
    messagingSenderId: "102448235465",
    appId: "1:102448235465:web:451e1edc5cbc6573e3de18",
    measurementId: "G-6NC441BM6P",
    databaseURL: "https://trucks-noname-default-rtdb.europe-west1.firebasedatabase.app",
};
export const fire = firebase.initializeApp(firebaseConfig);
