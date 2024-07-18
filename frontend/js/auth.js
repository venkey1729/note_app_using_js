document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
  
    if (loginForm) {
      loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
  
        try {
          const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
  
          const data = await response.json();
          if (response.ok) {
            localStorage.setItem('token', data.token);
            window.location.href = 'index.html';
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      });
    }
  
    if (registerForm) {
      registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
  
        try {
          const response = await fetch('http://localhost:5000/api/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
          });
  
          const data = await response.json();
          if (response.ok) {
            alert('Registration successful');
            window.location.href = 'login.html';
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      });
    }
  });
  