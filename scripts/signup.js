import './utils/firebase.js'; // Ensure Firebase is initialized before using auth
import { auth } from './utils/firebase.js'; // Import the auth instance
// Import necessary Firebase functions for authentication
import { createUserWithEmailAndPassword, updateProfile } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';

const signupButton = document.getElementById('signup-button');

signupButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        alert('Signup successful!');
        await updateProfile(userCredential.user, { displayName: name });
        alert(`User profile updated: ${userCredential.user.displayName}`);
        window.location.href = '../pages/app.html'; // Redirect to app page after signup
    } catch (error) {
        console.error('Error during signup:', error);
        alert(error.message);
    }
});