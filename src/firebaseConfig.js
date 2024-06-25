import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADdI5SwMw9q1-DM_YONSWUn5CpjMlxQ7U",
  authDomain: "auth-ff91b.firebaseapp.com",
  projectId: "auth-ff91b",
  storageBucket: "auth-ff91b.appspot.com",
  messagingSenderId: "1093572054484",
  appId: "1:1093572054484:web:9f4cb5ba6cfb44c663da41",
  measurementId: "G-0E716126XS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log("Firebase initialized:", app);
console.log("Auth instance:", auth);

export { auth };