import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyALiBvTIQW3hGyR-yJTp6lhKCga2FgKsyI",
    authDomain: "vanlife-79e35.firebaseapp.com",
    projectId: "vanlife-79e35",
    storageBucket: "vanlife-79e35.appspot.com",
    messagingSenderId: "733303739502",
    appId: "1:733303739502:web:07f8118d82ae4fa9d6427f"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore()