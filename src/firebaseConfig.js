// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsLF54iC7K6sem6ChMeB_q9Ihafit6SzE",
  authDomain: "photoalbums-409b5.firebaseapp.com",
  projectId: "photoalbums-409b5",
  storageBucket: "photoalbums-409b5.appspot.com",
  messagingSenderId: "780174218422",
  appId: "1:780174218422:web:b283ffd80420f54fff8217"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
