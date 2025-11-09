const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { sendUnauthorized } = require("../utils/errors");

module.exports = (req, res, next) => {
  // 1. Check for the 'token' cookie attached by the browser
  const { token } = req.cookies;

  if (!token) {
    // If no token is found in the cookie, send unauthorized response
    return sendUnauthorized(res, 'Authorization required');
  }

  // 2. Define the payload variable before use
  let payload;

  try {
    // 3. Verify the token from the cookie and assign the value to payload
    payload = jwt.verify(token, JWT_SECRET);

  } catch (err) {
    console.error(err);
    // If token verification fails, send unauthorized response
    return sendUnauthorized(res, "Invalid or expired token");
  }

  // 4. Attach the payload (user info) to the request object
  // (This must happen AFTER successful verification)
  req.user = payload;
  // You no longer need the duplicate 'req.user = payload;' line you had earlier.

  // 5. Proceed to the next middleware or route handler (createExpense)
  return next();
};