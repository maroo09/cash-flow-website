import './utils/firebase.js'; // Ensure Firebase is initialized before using auth
import { auth } from './utils/firebase.js'; // Import the auth instance
// Import necessary Firebase functions for authentication
import { signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';

const loginButton = document.getElementById('login-button');

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, redirect to app page
        window.location.href = '../pages/app.html';
    }
});

loginButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Login successful!');
        window.location.href = '../pages/app.html'; // Redirect to app page after login
    } catch (error) {
        console.error('Error during login:', error);
        alert(error.message);
    }
});