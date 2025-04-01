window.addEventListener('load', function () {
    const loaderTimeout = 1500;
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        const content = document.getElementById("content"); 
        if (content) content.style.display = 'block'; 
    }, loaderTimeout);
});

// Locomotive Scroll Initialization
const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    lerp: 0.07
});

document.addEventListener("DOMContentLoaded", () => {
    const userImg = document.getElementById("user-img");
    const loginBtn = document.getElementById("login-btn");
    const userProfile = document.getElementById("user-profile");

    if (!userImg || !loginBtn || !userProfile) return; // Prevent errors if elements are missing

    // Get user data from localStorage
    const userPhoto = localStorage.getItem("userPhoto");

    if (userPhoto) {
        userImg.src = userPhoto;
        userProfile.style.display = "block"; // Show profile section
        loginBtn.style.display = "none"; // Hide login button
    } else {
        userProfile.style.display = "none"; // Hide profile section
        loginBtn.style.display = "inline-block"; // Show login button
    }

    // Check if Firebase auth state changes
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            // Clear storage if user is logged out
            localStorage.removeItem("userPhoto");
            localStorage.removeItem("userName");
            userProfile.style.display = "none";
            loginBtn.style.display = "inline-block";
        }
    });
});
