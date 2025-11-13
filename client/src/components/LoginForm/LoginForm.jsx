import { useState } from 'react';
import './loginform.css';

function LoginForm({
  isOpen,
  onClose,
  onLoginSubmit,
  onSignupSubmit,
  onSwitchToSignup,
}) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [singupPasswordRetype, setSignupPasswordRetype] = useState('');

  const [showSignupCard, setShowSignupCard] = useState(true);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onLoginSubmit(loginEmail, password);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordRetype) {
      alert('Passwords do not match');
      return;
    }
    onSignupSubmit(signupName, signupEmail, signupPassword);
  };

  const switchLogin = () => {
    setShowSignupCard(!showSignupCard);
  };

  if (!isOpen) return null;

  return (
    <div className="form-overlay">
      <section className="loginform">
        <img
          src="assets/logo.png"
          alt="Logo"
          className="loginform__logo-header"
        />
        {showSignupCard ? (
          // LOGIN CARD
          <div className="loginform__card">
            <h1 className="loginform__slogan">Welcome back!</h1>
            <div className="loginform__signup">
              Don’t have an account?{' '}
              <a className="loginform__signup-btn" onClick={switchLogin}>
                Sign Up
              </a>
            </div>
            <button
              type="button"
              className="loginform__close-btn"
              onClick={onClose}
            >
              X
            </button>
            <form onSubmit={handleLoginSubmit}>
              <div className="loginform__field">
                <div className="loginform__label">
                  <span className="loginform__label-dashes"></span>
                  <label
                    className="loginform__label-text"
                    htmlFor="login-email"
                  >
                    Email
                  </label>
                  <span className="loginform__label-dashes"></span>
                </div>

                <input
                  className="loginform__input"
                  type="email"
                  id="login-email"
                  placeholder="you@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>

              <div className="loginform__field">
                <div className="loginform__label">
                  <span className="loginform__label-dashes"></span>
                  <label
                    className="loginform__label-text"
                    htmlFor="login-password"
                  >
                    Password
                  </label>
                  <span className="loginform__label-dashes"></span>
                </div>

                <input
                  className="loginform__input"
                  type="password"
                  id="login-password"
                  placeholder="********"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  minLength="8"
                />
              </div>

              <button type="submit" className="loginform__submit">
                Login
              </button>
            </form>
          </div>
        ) : (
          // SIGN UP CARD
          <div className="signupform__card">
            <form onSubmit={handleSignupSubmit}>
              <button
                type="button"
                className="loginform__close-btn"
                onClick={onClose}
              >
                X
              </button>

              <h1 className="loginform__slogan">Sign Up</h1>
              <div className="loginform__signup">
                Have an account?{' '}
                <a className="loginform__signup-btn" onClick={switchLogin}>
                  Sign In
                </a>
              </div>
              <div className="signupform__inputs">
                <div className="loginform__field">
                  <div className="loginform__label">
                    <span className="loginform__label-dashes"></span>
                    <label
                      className="loginform__label-text"
                      htmlFor="signup-name"
                    >
                      Name
                    </label>
                    <span className="loginform__label-dashes"></span>
                  </div>
                  <input
                    className="loginform__input signupform__input"
                    type="text"
                    id="signup-name"
                    placeholder="john doe"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    required
                  />
                </div>
                <div className="loginform__field">
                  <div className="loginform__label">
                    <span className="loginform__label-dashes"></span>
                    <label
                      className="loginform__label-text"
                      htmlFor="signup-email"
                    >
                      Email
                    </label>
                    <span className="loginform__label-dashes"></span>
                  </div>
                  <input
                    className="loginform__input signupform__input"
                    type="email"
                    id="signup-email"
                    placeholder="you@example.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="loginform__field">
                  <div className="loginform__label">
                    <span className="loginform__label-dashes"></span>
                    <label
                      className="loginform__label-text"
                      htmlFor="signup-password"
                    >
                      Password
                    </label>
                    <span className="loginform__label-dashes"></span>
                  </div>
                  <input
                    className="loginform__input signupform__input"
                    type="password"
                    id="signup-password"
                    placeholder="********"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                    minLength="8"
                  />
                </div>
                <div className="loginform__field">
                  <div className="loginform__label">
                    <span className="loginform__label-dashes"></span>
                    <label
                      className="loginform__label-text"
                      htmlFor="signup-password-retype"
                    >
                      Retype Password
                    </label>
                    <span className="loginform__label-dashes"></span>
                  </div>
                  <input
                    className="loginform__input signupform__input"
                    type="password"
                    id="signup-password-retype"
                    placeholder="********"
                    value={singupPasswordRetype}
                    onChange={(e) => setSignupPasswordRetype(e.target.value)}
                    required
                    minLength="8"
                  />
                </div>
              </div>

              <button type="submit" className="loginform__submit">
                Sign Up
              </button>
            </form>
          </div>
        )}
      </section>
      <div className="loginform__logo">
        <img
          src="/assets/loginformimg.png"
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
  );
}

export default LoginForm;
