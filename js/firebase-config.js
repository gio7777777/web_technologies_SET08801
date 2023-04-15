import { getFirestore, doc, getDocs, getDoc, collection, addDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyCAw1YB6xWL89oQqtP2NHpTcys4uHEbQLo",
    authDomain: "js-project-14605.firebaseapp.com",
    projectId: "js-project-14605",
    storageBucket: "js-project-14605.appspot.com",
    messagingSenderId: "777951852780",
    appId: "1:777951852780:web:90e18ab6034c1535c44dc9"
};

//get variables from url 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const cuisine = urlParams.get('cuisine');

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export default db;