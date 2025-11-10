import { useState } from 'react';
import './signupform.css';

function SignupForm({ isOpen, onClose, onSubmit }) {
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

  if (!isOpen) return null;

  return (
    <section className="signupform">
      <div className="signupform__card">
        <form onSubmit={handleSubmit}>
          <button type="button" className="signupform__close-button" onClick={onClose}>
            X
          </button>

          <h2 className="signupform__title">Sign Up</h2>

          <div className="signupform__inputs">
            <label className="signupform__label" htmlFor="signup-name">Name</label>
            <input
              className="signupform__input"
              type="text"
              id="signup-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label className="signupform__label" htmlFor="signup-email">Email</label>
            <input
              className="signupform__input"
              type="email"
              id="signup-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="signupform__label" htmlFor="signup-password">Password</label>
            <input
              className="signupform__input"
              type="password"
              id="signup-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="8"
            />

            <label className="signupform__label" htmlFor="signup-password-retype">Retype Password</label>
            <input
              className="signupform__input"
              type="password"
              id="signup-password-retype"
              value={passwordRetype}
              onChange={(e) => setPasswordRetype(e.target.value)}
              required
              minLength="8"
            />
          </div>

          <button type="submit" className="signupform__submit-btn">
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
}

export default SignupForm;
