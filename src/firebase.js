import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZ28Y1rH5QX6A99Q7fjeZb4vPDLTZ5alM",
  authDomain: "leettype-32f64.firebaseapp.com",
  projectId: "leettype-32f64",
  storageBucket: "leettype-32f64.appspot.com",
  messagingSenderId: "1068132259079",
  appId: "1:1068132259079:web:d7dc3352af588a9e0161a2",
  measurementId: "G-TQ4XPF6CBH"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
