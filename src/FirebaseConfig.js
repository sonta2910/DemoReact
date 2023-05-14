// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD74ye-t_TeI4mUeOoNNgVs2LjWrIX9LUc",
    authDomain: "store-product-minitest.firebaseapp.com",
    projectId: "store-product-minitest",
    storageBucket: "store-product-minitest.appspot.com",
    messagingSenderId: "133123048472",
    appId: "1:133123048472:web:e3c935121555128a3cef6d",
    measurementId: "G-HTZ33XJBP0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
