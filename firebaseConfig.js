import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBEsDfHHyXAUSEr91O50vO36Sl8C284sK0",
  authDomain: "resume-builder-1511a.firebaseapp.com",
  projectId: "resume-builder-1511a",
  storageBucket: "resume-builder-1511a.appspot.com",
  messagingSenderId: "573761435578",
  appId: "1:573761435578:web:fe113d09bcc767f0b10f83",
  measurementId: "G-F44YCVW7YL"
};


firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider(); 
var db = getFirestore();
export {auth , provider , db};