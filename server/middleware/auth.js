const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const { sendUnauthorized } = require("../utils/errors");

module.exports = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return sendUnauthorized(res, 'Authorization required');
  }

  let payload;
  try {
    payload = jwt.verify(token, secret);
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return sendUnauthorized(res, "Invalid or expired token");
  }

  req.user = payload;
  return next();
};
