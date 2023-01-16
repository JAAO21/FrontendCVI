// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPcifOe3_qxlKKkZPcMqbUUyc8_twLEIo",
  authDomain: "cviseminario.firebaseapp.com",
  projectId: "cviseminario",
  storageBucket: "cviseminario.appspot.com",
  messagingSenderId: "679063066771",
  appId: "1:679063066771:web:058a1f5c0dec36e4f1d566",
  measurementId: "G-2BHBT3NE0R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export default app;