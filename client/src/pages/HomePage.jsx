import { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import SignupForm from '../components/SignupForm/SignupForm';
import { api } from '../utils/api';

function HomePage({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const data = await api.checkAuth();
      if (data.authenticated) {
        setUser(data);
        setShowLogin(false);
        setShowSignup(false);
        onLogin(); // update App.jsx
      }
    };
    checkAuth();
  }, []);

  // Real login
  const handleLogin = async (email, password) => {
    try {
      const data = await api.login(email, password);
      console.log('Login success:', data);
      setUser(data.user);
      setShowLogin(false);
      setShowSignup(false);
      onLogin(); // updates App.jsx
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  };

  // Real signup
  const handleSignup = async (name, email, password) => {
    try {
      const data = await api.signup(name, email, password);
      console.log('Signup success:', data);
      alert('Account created! Please login.');
      setShowSignup(false);
      setShowLogin(true);
    } catch (err) {
      alert('Signup failed: ' + err.message);
    }
  };

  return (
    <div>
      {/* Show Login Form */}
      <LoginForm
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSubmit={handleLogin}
      />

      {/* Show Signup Form */}
      <SignupForm
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        onSubmit={handleSignup}
      />

      {/* Dashboard / User home */}
      {user && (
        <section className="user-home">
          <h2 className="login-home-title">Welcome, {user.name}!</h2>
          <div className="blox">
            <div className="blox__icon">Housing</div>
            <div className="blox__icon">Food</div>
            <div className="blox__icon">Transport</div>
            <div className="blox__icon">Entertainment</div>
          </div>
        </section>
      )}

      {/* Buttons to switch forms if not logged in */}
      {!user && !showLogin && !showSignup && (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button onClick={() => setShowLogin(true)}>Login</button>
          <button onClick={() => setShowSignup(true)} style={{ marginLeft: '12px' }}>Signup</button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
