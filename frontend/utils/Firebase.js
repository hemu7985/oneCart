// Import the functions you need from the SDKs you need
import {  getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";



const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginonecart-395b4.firebaseapp.com",
  projectId: "loginonecart-395b4",
  storageBucket: "loginonecart-395b4.firebasestorage.app",
  messagingSenderId: "934109381627",
  appId: "1:934109381627:web:2c3397dd1d5d3fa166815e"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider = new GoogleAuthProvider()
//export default app;

export {auth, provider}