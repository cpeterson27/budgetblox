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
    <div className="loginform">
      <section className="loginform__card">
                    <button type="button" className="loginform__close-button" onClick={onClose}>
            X
          </button>
        <div className="loginform__logo">💰 BudgetBlox</div>
        <div className="loginform__slogan">Welcome back! Please log in.</div>

        <div className="loginform__card">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="loginform__label">Email</label>
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

            <div>
              <label className="loginform__label">Password</label>
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
            <button type="button" className="signupform_submit" onClick={onSwitchToSignup}>
              Don’t have an account? Sign Up
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default LoginForm;
