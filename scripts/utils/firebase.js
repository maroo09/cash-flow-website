import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyANlk6b9tliAABbLWY-dFXnkQIjSQRVJvk",
    authDomain: "cash-flow-69940.firebaseapp.com",
    projectId: "cash-flow-69940",
    storageBucket: "cash-flow-69940.firebasestorage.app",
    messagingSenderId: "458133625880",
    appId: "1:458133625880:web:f7242b1ea7e30d46ecb76d",
    measurementId: "G-SW5G9BZGHS",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// Export the Firebase app, auth, and db for use in other modules
export default app;