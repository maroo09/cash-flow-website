import './utils/firebase.js'; // Ensure Firebase is initialized before using auth
import { auth } from './utils/firebase.js'; // Import the auth instance
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';

const displayName = document.getElementById('display-name');
const logoutButton = document.getElementById('logout-button');

// Check if the user is already authenticated
onAuthStateChanged(auth, (user) => {
    if (!user) {
        // User is not signed in, redirect to login page
        window.location.href = '../pages/login.html';
    } else {
        // User is signed in, display their name
        displayName.textContent = user.displayName || user.email;
    }
});

logoutButton.addEventListener('click', async () => {
    try {
        await signOut(auth);
        alert('You have been logged out successfully.');
        window.location.href = '../pages/login.html'; // Redirect to login page after logout
    } catch (error) {
        console.error('Error during logout:', error);
        alert('An error occurred while logging out. Please try again.');
    }
});