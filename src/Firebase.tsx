import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const config = {
  apiKey: "AIzaSyBVl-qHSaEnyvMtEjixDhUbSPfhy-2qHJI",
  authDomain: "wee-hub.firebaseapp.com",
  projectId: "wee-hub",
  storageBucket: "wee-hub.appspot.com",
  messagingSenderId: "753196544338",
  appId: "1:753196544338:web:8da6d2d0c17b64b19e0a8b",
  measurementId: "G-2WE0WWH82C",
};

const app = initializeApp(config);
getAnalytics(app);

export const db = getFirestore(app);
