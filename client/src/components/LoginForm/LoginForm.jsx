import { useState } from 'react';
import './loginform.css';

function LoginForm({ isOpen, onClose, onSubmit, onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  if (!isOpen) return <></>;

  return (
    <div className="loginform__card">
      <h1 className="loginform__slogan">Welcome back!</h1>
      <div className="loginform__signup">
        Don’t have an account?{' '}
        <a className="loginform__signup-btn" onClick={onSwitchToSignup}>
          Sign Up
        </a>
      </div>
      <button type="button" className="loginform__close-btn" onClick={onClose}>
        X
      </button>
      <form onSubmit={handleSubmit}>
        <div className="loginform__field">
          <div className="loginform__label">
            <span className="loginform__label-dashes"></span>
            <label className="loginform__label-text" htmlFor="login-email">
              Email
            </label>
            <span className="loginform__label-dashes"></span>
          </div>

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
          <div className="loginform__label">
            <span className="loginform__label-dashes"></span>
            <label className="loginform__label-text" htmlFor="login-password">
              Password
            </label>
            <span className="loginform__label-dashes"></span>
          </div>

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
      </form>
    </div>
  );
}

export default LoginForm;
