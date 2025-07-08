import "./utils/firebase.js"; // Ensure Firebase is initialized before using auth
import { auth, db } from "./utils/firebase.js"; // Import the auth instance
import {
    onAuthStateChanged,
    signOut,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import {
    collection,
    doc,
    setDoc,
    onSnapshot,
    deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const displayName = document.getElementById("display-name");
const logoutButton = document.getElementById("logout-button");
const booksSelect = document.getElementById("books-select");

let selectedBookId = -1; // Default value for no book selected
// Add event listener for book selection change
booksSelect.addEventListener("change", (event) => {
    selectedBookId = event.target.value; // Update the selected book ID
});

const editBookButton = document.getElementById("edit-book-button");
editBookButton.addEventListener("click", () => {
    const selectedBookId = booksSelect.value;
    if (selectedBookId === "-1") {
        alert("Please select a book to edit.");
        return;
    }
    const bookTitle = prompt("Enter the new book title:");
    if (bookTitle) {
        const bookRef = doc(
            db,
            "Data",
            auth.currentUser.uid,
            "Books",
            selectedBookId
        );
        setDoc(
            bookRef,
            {
                title: bookTitle,
                timestamp: new Date(),
            },
            { merge: true }
        )
            .then(() => {
                alert("Book updated successfully!");
            })
            .catch((error) => {
                console.error("Error updating book:", error);
                alert(
                    "An error occurred while updating the book. Please try again."
                );
            });
    } else {
        alert("Book title cannot be empty.");
    }
});

const deleteBookButton = document.getElementById("delete-book-button");
deleteBookButton.addEventListener("click", () => {
    const selectedBookId = booksSelect.value;
    if (selectedBookId === "-1") {
        alert("Please select a book to delete.");
        return;
    }
    const confirmDelete = confirm(
        "Are you sure you want to delete this book?"
    );
    if (confirmDelete) {
        const bookRef = doc(
            db,
            "Data",
            auth.currentUser.uid,
            "Books",
            selectedBookId
        );
        deleteDoc(bookRef)
            .then(() => {
                alert("Book deleted successfully!");
            })
            .catch((error) => {
                console.error("Error deleting book:", error);
                alert(
                    "An error occurred while deleting the book. Please try again."
                );
            });
    }
});

// Check if the user is already authenticated
onAuthStateChanged(auth, (user) => {
    if (!user) {
        // User is not signed in, redirect to login page
        window.location.href = "../pages/login.html";
    } else {
        // User is signed in, display their name
        displayName.textContent = user.displayName || user.email;

        // Listen for real-time updates to books
        const userBooksRef = collection(db, "Data", user.uid, "Books");
        onSnapshot(userBooksRef, (docSnap) => {
            console.log(
                "Listening for updates to user document:",
                userBooksRef.path
            );
            booksSelect.innerHTML =
                '<option selected disabled value="-1">-- Select Book --</option>'; // Clear existing options
            docSnap.forEach((doc) => {
                const bookData = doc.data();
                const option = document.createElement("option");
                option.value = doc.id; // Use document ID as value
                option.textContent = bookData.title; // Display book title
                if (doc.id === selectedBookId) {
                    option.selected = true; // Select the previously selected book
                }
                booksSelect.appendChild(option);
            });
        });
    }
});

logoutButton.addEventListener("click", async () => {
    try {
        await signOut(auth);
        alert("You have been logged out successfully.");
        window.location.href = "../pages/login.html"; // Redirect to login page after logout
    } catch (error) {
        console.error("Error during logout:", error);
        alert("An error occurred while logging out. Please try again.");
    }
});

const addBookButton = document.getElementById("add-book-button");
addBookButton.addEventListener("click", () => {
    const bookTitle = prompt("Enter the book title:");
    if (bookTitle) {
        const bookRef = doc(
            collection(db, "Data", auth.currentUser.uid, "Books")
        );
        setDoc(bookRef, {
            title: bookTitle,
            timestamp: new Date(),
        })
            .then(() => {
                alert("Book added successfully!");
            })
            .catch((error) => {
                console.error("Error adding book:", error);
                alert(
                    "An error occurred while adding the book. Please try again."
                );
            });
    } else {
        alert("Book title cannot be empty.");
    }
});
