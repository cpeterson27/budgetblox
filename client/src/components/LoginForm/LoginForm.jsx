import { useState } from 'react';
import './loginform.css';

function LoginForm({ isOpen, onClose, onSubmit, onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  if (!isOpen) return null;

  return (
    <div className="form-overlay">
      <section className="loginform">
        <div className="loginform__logo">💰 BudgetBlox</div>
        <div className="loginform__slogan">Welcome back! Please log in.</div>

        <div className="loginform__card">
          <button className="loginform__close-button" onClick={onClose}>
            X
          </button>
          <form onSubmit={handleSubmit}>
            <div className="loginform__field">
              <label className="loginform__label" htmlFor="login-email">
                Email
              </label>
              <input
                className="loginform__input"
                type="email"
                id="login-email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="loginform__field">
              <label className="loginform__label" htmlFor="login-password">
                Password
              </label>
              <input
                className="loginform__input"
                type="password"
                id="login-password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="8"
              />
            </div>
            <button type="submit" className="loginform__submit">
              Login
            </button>
            <button
              type="submit"
              className="signupform"
              onClick={onSwitchToSignup}
            >
              {' '}
              Don’t have an account? Sign Up
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default LoginForm;
