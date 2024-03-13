// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWPjG8azNyr837bizDPbd8WvfgOeUKgSs",
  authDomain: "moneydiaryapp.firebaseapp.com",
  projectId: "moneydiaryapp",
  storageBucket: "moneydiaryapp.appspot.com",
  messagingSenderId: "409562749057",
  appId: "1:409562749057:web:98ad5ce8f65b9654b89580",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
