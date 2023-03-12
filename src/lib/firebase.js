import Firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { seedDatabase } from '../seed';

const config ={
  apiKey: "AIzaSyBnce6hKG57lA9PtRtBXEZiLNDL1z0yKP8",
  authDomain: "instagram-clone-610ca.firebaseapp.com",
  projectId: "instagram-clone-610ca",
  storageBucket: "instagram-clone-610ca.appspot.com",
  messagingSenderId: "442290529961",
  appId: "1:442290529961:web:e7d0ec0081ac7cdbbaebb8"
};

const firebase = Firebase.initializeApp(config);
const {FieldValue} = Firebase.firestore;
console.log('firebase', firebase)
// seedDatabase(firebase);

export {firebase, FieldValue}