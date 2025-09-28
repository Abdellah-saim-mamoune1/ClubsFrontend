import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDccJ7HDBr4a_CWR3YgCxNAFPMtztMyN48",
  authDomain: "integration-32bf8.firebaseapp.com",
  projectId: "integration-32bf8",
  storageBucket: "integration-32bf8.firebasestorage.app",
  messagingSenderId: "197428061154",
  appId: "1:197428061154:web:dd045f8791a444ccc28fbb",
  measurementId: "G-XYCJMDNC53"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
