import './utils/firebase.js'; // Ensure Firebase is initialized before using auth
import { auth, db } from './utils/firebase.js'; // Import the auth instance
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';
import { collection, doc, setDoc } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js';

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

const addBookButton = document.getElementById('add-book-button');
addBookButton.addEventListener('click', () => {
    const bookTitle = prompt('Enter the book title:');
    if (bookTitle) {
        console.log(auth.currentUser);
        const bookRef = doc(collection(db, 'Data', auth.currentUser.uid, "Books"));
        console.log(`Adding book with title: ${bookTitle} to Firestore`);
        console.log(bookRef);
        setDoc(bookRef, {
            title: bookTitle,
            timestamp: new Date()
        }).then(() => {
            alert('Book added successfully!');
        }).catch((error) => {
            console.error('Error adding book:', error);
            alert('An error occurred while adding the book. Please try again.');
        });
    } else {
        alert('Book title cannot be empty.');
    }
});