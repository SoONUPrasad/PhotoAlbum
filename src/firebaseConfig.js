// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHV8EU9nPzeVoqbMMTtuWnjR5rRWZgULQ",
  authDomain: "photosalbum-aad23.firebaseapp.com",
  projectId: "photosalbum-aad23",
  storageBucket: "photosalbum-aad23.appspot.com",
  messagingSenderId: "302103812507",
  appId: "1:302103812507:web:b01e5800e8b721f8a2e93e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
