import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjMHYumiyDPlphr-SJwFaofTpqN-NIdUY",
  authDomain: "smart-hall-booking-763d6.firebaseapp.com",
  projectId: "smart-hall-booking-763d6",
  storageBucket: "smart-hall-booking-763d6.firebasestorage.app",
  messagingSenderId: "225928778239",
  appId: "1:225928778239:web:0c2b9efbb1517c107117ca",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
