import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDuKN_GhDJ7ZFiOlUAmae-63iS5iN6B5U4",
  authDomain: "fir-demo-713b2.firebaseapp.com",
  databaseURL: "https://fir-demo-713b2-default-rtdb.firebaseio.com",
  projectId: "fir-demo-713b2",
  storageBucket: "fir-demo-713b2.appspot.com",
  messagingSenderId: "222394900086",
  appId: "1:222394900086:web:42aec6073a1cbd9b6dc957"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
