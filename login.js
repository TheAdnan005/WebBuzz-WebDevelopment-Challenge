const loginForm = document.querySelector('.login-form');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.querySelector('input[placeholder="Email"]').value;
  const password = document.querySelector('input[placeholder="Password"]').value;

  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const message = await response.text();
    console.log(message);

    if (response.ok) {
      alert(`Success: ${message}`);
    } else {
      console.error(`Error ${response.status}: ${message}`);
      alert(`Error: ${message}`);
    }
  } catch (error) {
    console.error('Fetch error:', error);
    alert('An error occurred during login. Please check your network connection or try again later.');
  }
});