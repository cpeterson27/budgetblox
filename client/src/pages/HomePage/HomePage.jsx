import { useState, useEffect } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignupForm from '../../components/SignupForm/SignupForm';
import { api } from '../../utils/api';
import './homepage.css';

function HomePage({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const data = await api.checkAuth();
      if (data.authenticated) {
        setUser(data.user);
        setShowLogin(false);
        setShowSignup(false);
        onLogin(data.user);
      }
    };
    checkAuth();
  }, [onLogin]);

  const handleLogin = async (email, password) => {
    try {
      const data = await api.login(email, password);
      console.log('Login success:', data);
      setUser(data.user);
      setShowLogin(false);
      setShowSignup(false);
      onLogin(data.user);
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  };

  const handleSignup = async (name, email, password) => {
    try {
      await api.signup(name, email, password);
      alert('Account created! Please login.');
      setShowSignup(false);
      setShowLogin(true);
    } catch (err) {
      alert('Signup failed: ' + err.message);
    }
  };
  return (
    <div>
      <div className="form-overlay">
        <section className="loginform">
          <img
            src="assets/logo.png"
            alt="Logo"
            className="loginform__logo-header"
          />
          {user ? <div>Welcome, {user.name}</div> : <></>}
          <LoginForm
            isOpen={showLogin}
            onClose={() => setShowLogin(false)}
            onSubmit={handleLogin}
            onSwitchToSignup={() => {
              setShowLogin(false);
              setShowSignup(true);
            }}
          />
          <SignupForm
            isOpen={showSignup}
            onClose={() => setShowSignup(false)}
            onSubmit={handleSignup}
            onSwitchToLogin={() => {
              setShowLogin(true);
              setShowSignup(false);
            }}
          />
        </section>
        <div className="loginform__logo">
          <img
            src="assets/loginformimg.png"
            alt="BudgetBlox Logo"
            className="loginform__logo-img"
          />
          <span className="loginform__logo-text">
            Spend smart,
            <br />
            live bright,
            <br />
            grow wealth.
          </span>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
