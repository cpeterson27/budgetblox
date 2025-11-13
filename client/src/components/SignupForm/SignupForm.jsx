import { useState } from 'react';
import './signupform.css';

function SignupForm({ isOpen, onClose, onSubmit, onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRetype, setPasswordRetype] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordRetype) {
      alert('Passwords do not match');
      return;
    }
    onSubmit(name, email, password);
  };

  if (!isOpen) return <></>;

  return (
    <div className="signupform__card">
      <form onSubmit={handleSubmit}>
        <button
          type="button"
          className="loginform__close-btn"
          onClick={onClose}
        >
          X
        </button>

        <h1 className="signupform__slogan">Sign Up</h1>
        <div className="signupform__login">
          Have an account?{' '}
          <a className="signupform__login-btn" onClick={onSwitchToLogin}>
            Sign In
          </a>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="signupform__field">
            <div className="signupform__label">
              <span className="signupform__label-dashes"></span>
              <label className="signupform__label-text" htmlFor="signup-name">
                Name
              </label>
              <span className="signupform__label-dashes"></span>
            </div>
            <input
              className="signupform__input"
              type="text"
              id="signup-name"
              placeholder="john doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="signupform__field">
            <div className="signupform__label">
              <span className="signupform__label-dashes"></span>
              <label className="signupform__label-text" htmlFor="signup-email">
                Email
              </label>
              <span className="signupform__label-dashes"></span>
            </div>
            <input
              className="signupform__input"
              type="email"
              id="signup-email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="signupform__field">
            <div className="signupform__label">
              <span className="signupform__label-dashes"></span>
              <label
                className="signupform__label-text"
                htmlFor="signup-password"
              >
                Password
              </label>
              <span className="signupform__label-dashes"></span>
            </div>
            <input
              className="signupform__input"
              type="password"
              id="signup-password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="8"
            />
          </div>
          <div className="signupform__field">
            <div className="signupform__label">
              <span className="signupform__label-dashes"></span>
              <label
                className="signupform__label-text"
                htmlFor="signup-password-retype"
              >
                Retype Password
              </label>
              <span className="signupform__label-dashes"></span>
            </div>
            <input
              className="signupform__input"
              type="password"
              id="signup-password-retype"
              placeholder="********"
              value={passwordRetype}
              onChange={(e) => setPasswordRetype(e.target.value)}
              required
              minLength="8"
            />
          </div>
        </form>
        <button type="submit" className="signupform__submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
