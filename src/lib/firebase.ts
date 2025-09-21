// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "studio-2665875422-9ee7a",
  "appId": "1:439839363685:web:0ee26eec78f09929992c8c",
  "apiKey": "AIzaSyDeoJgqm80qsuDp78x2TkFiA0tozVVbkn0",
  "authDomain": "studio-2665875422-9ee7a.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "439839363685"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
