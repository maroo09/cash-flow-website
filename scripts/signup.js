import './utils/firebase.js'; // Ensure Firebase is initialized before using auth
import { auth } from './utils/firebase.js'; // Import the auth instance
// Import necessary Firebase functions for authentication
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';

const signupButton = document.getElementById('signup-button');

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, redirect to app page
        window.location.href = '../pages/app.html';
    }
});

signupButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update the display name
        await updateProfile(user, { displayName: name });
        console.log('Profile updated:', auth.currentUser.displayName);

        // Force reload of user data from server to be safe (optional)
        await user.reload();

        // Confirm update before redirect
        alert(`User profile updated: ${auth.currentUser.displayName}`);

        // Now redirect
        window.location.href = '../pages/app.html';
    } catch (error) {
        console.error('Error during signup:', error);
        alert(error.message);
    }
});
