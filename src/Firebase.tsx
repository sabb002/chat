import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyBXFrbD6Pf1eft2Jh7_jclmxDu-JHfN8Mg",
  authDomain: "chat-cf3c6.firebaseapp.com",
  projectId: "chat-cf3c6",
  storageBucket: "chat-cf3c6.appspot.com",
  messagingSenderId: "939891331352",
  appId: "1:939891331352:web:942cba568a7499846a4e6d",
};

const app = initializeApp(config);

export const db = getFirestore(app);
