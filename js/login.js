const loginForm = document.querySelector('.login-form');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.querySelector('input[placeholder="Email"]').value;
  const password = document.querySelector('input[placeholder="Password"]').value;
  const username = document.querySelector('.login-username').value;

  // Store the username in localStorage
  localStorage.setItem('loggedInUser', username);
  console.log("Username:", username); // For debugging purposes

  // Redirect back to the home page (index.html)
  window.location.href = 'index.html';
});
