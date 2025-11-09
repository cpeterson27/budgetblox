const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-dev';
const PORT = process.env.PORT || 3001;

module.exports = {
  JWT_SECRET,
  PORT,
};