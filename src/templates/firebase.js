import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBnrOLlosTDGHCxXKZdFrO_ev-Oy2Ruv3U",
    authDomain: "nexora-213e2.firebaseapp.com",
    projectId: "nexora-213e2",
    storageBucket: "nexora-213e2.appspot.com",
    messagingSenderId: "998457123271",
    appId: "1:998457123271:web:436292c777f2d2b29b39e2",
    measurementId: "G-V74NX09TNP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google Sign-In
document.getElementById("google-btn").addEventListener("click", async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        
        // Store user info in localStorage
        localStorage.setItem("userPhoto", user.photoURL);
        localStorage.setItem("userName", user.displayName);

        // Redirect to index.html after login
        window.location.href = "index.html";  // Assuming index.html is in the root folder
    } catch (error) {
        console.error("Login Error:", error.message);
    }
});

// Logout Function
document.getElementById("logout-btn").addEventListener("click", async () => {
    try {
        await signOut(auth);  // Firebase logout
        localStorage.clear(); // Clear local storage
        sessionStorage.clear(); // Clear session storage
        window.location.href = "index.html"; // Redirect after logout
    } catch (error) {
        console.error("Logout Error:", error);
    }
});

// Check if the user is logged in
document.addEventListener("DOMContentLoaded", () => {
    const userImg = document.getElementById("user-img");
    const loginBtn = document.getElementById("login-btn");
    const userProfile = document.getElementById("user-profile");

    const userPhoto = localStorage.getItem("userPhoto");

    if (userPhoto) {
        userImg.src = userPhoto;
        userProfile.style.display = "block";  // Show profile section
        loginBtn.style.display = "none";  // Hide login button
    } else {
        userProfile.style.display = "none";  // Hide profile section
        loginBtn.style.display = "inline-block";  // Show login button
    }

    auth.onAuthStateChanged((user) => {
        if (!user) {
            localStorage.clear();
            sessionStorage.clear();
            console.log("User is not logged in, clearing data.");
        }
    });
});
