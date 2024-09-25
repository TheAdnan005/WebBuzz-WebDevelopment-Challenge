document.addEventListener('DOMContentLoaded', () => {
  const imageContainer = document.querySelector('.image-container');
  const images = Array.from(imageContainer.children);

  let currentImageIndex = 0;

  // Function to show the next image
  function showNextImage() {
      // Hide the current image (both background and foreground)
      images[currentImageIndex].style.display = 'none';

      // Move to the next image index
      currentImageIndex = (currentImageIndex + 1) % images.length;

      // Show the next image (both background and foreground)
      images[currentImageIndex].style.display = 'block';
  }

  // Initially hide all images except the first one
  images.forEach((img, index) => {
      img.style.display = index === 0 ? 'block' : 'none';
  });

  // Show images at intervals
  setInterval(showNextImage, 2000); // Change image every 2 seconds
});

// Clear login state on fresh page load
window.addEventListener("DOMContentLoaded", () => {
    const loginLink = document.getElementById("login-link");
    const loggedInUser = localStorage.getItem("loggedInUser");
    const logout = document.querySelector(".Logout");

    if (loggedInUser) {
      // Replace the login link with the username
      loginLink.innerHTML = `<div class="logged-in-user">Hi, ${loggedInUser}</div>`;
      loginLink.href = "#"; // Optional: change the link to something else if needed
      logout.classList.remove("hide");
    } else {
      // Set default state to "Login" if no user is logged in
      loginLink.innerHTML = `<div class="nav-elements">Login</div>`;
      loginLink.href = "login.html";
      logout.classList.add("hide");
    }

    // Logout functionality
    logout.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.reload(); // Refresh the page to reset to the logged-out state
    });
  });
