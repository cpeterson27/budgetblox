import { api } from './api.js';

export function initAuth(onLoginSuccess) {
  // Show/hide forms
  document.getElementById('button-option-login')?.addEventListener('click', () => {
    document.getElementById('login-form').style.display = 'flex';
  });

  document.getElementById('button-option-signup')?.addEventListener('click', () => {
    document.getElementById('signup-form').style.display = 'flex';
  });

  document.getElementById('login-close-button')?.addEventListener('click', () => {
    document.getElementById('login-form').style.display = 'none';
  });

  document.getElementById('signup-close-button')?.addEventListener('click', () => {
    document.getElementById('signup-form').style.display = 'none';
  });

  // Handle login
  document.getElementById('login-form-element')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const result = await api.login(username, password);
      if (result.message === 'Login successful') {
        document.getElementById('login-form').style.display = 'none';
        onLoginSuccess();
      } else {
        alert(result.message || 'Login failed');
      }
    } catch (err) {
      alert('Login error: ' + err.message);
    }
  });

  // Handle signup
  document.getElementById('signup-form-element')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const username = document.getElementById('username-new').value;
    const password = document.getElementById('password-new').value;
    const passwordRetype = document.getElementById('password-retype').value;

    if (password !== passwordRetype) {
      alert('Passwords do not match');
      return;
    }

    try {
      const result = await api.signup(email, username, password);
      alert(result.message || 'Account created! Please login.');
      document.getElementById('signup-form').style.display = 'none';
      document.getElementById('login-form').style.display = 'flex';
    } catch (err) {
      alert('Signup error: ' + err.message);
    }
  });
}