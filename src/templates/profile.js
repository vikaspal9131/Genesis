import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase Auth and Firestore initialization
const auth = getAuth();
const db = getFirestore();

document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, async (user) => {
    const getStartedBtn = document.querySelector('.sign-in-btn');
    const userProfile = document.querySelector('.user-profile');
    const userPhoto = document.getElementById("userPhoto");

    if (user) {
      try {
        // Check Firestore if the user exists
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (!userDoc.exists()) {
          // If user doesn't exist in Firestore, log them out and clear data
          logoutUser();
          return;
        }

        // Set profile photo
        const profilePhoto = user.photoURL || "default-profile.png"; // Default fallback if no photo exists
        userPhoto.src = profilePhoto;
        userPhoto.alt = `${user.displayName}'s profile picture`;

        if (getStartedBtn) getStartedBtn.style.display = 'none';
        userProfile.style.display = 'block';
      } catch (error) {
        console.error("Error checking Firestore user:", error);
        logoutUser(); // If an error occurs (e.g. user deleted from Firestore), log out
      }
    } else {
      logoutUser(); // If no user is logged in, clear local storage and hide profile
    }
  });
});

// Logout function: Clears storage & reloads page
function logoutUser() {
  localStorage.clear();
  sessionStorage.clear();
  window.location.reload(); // Reload the page to reset the state
}

// Optional: Log out the user when they click the logout button
document.getElementById("logout-btn")?.addEventListener("click", async () => {
  try {
    await signOut(auth);
    logoutUser();
  } catch (error) {
    console.error("Logout Error:", error);
  }
});
