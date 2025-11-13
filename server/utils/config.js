const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-dev';
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/budgetblox';

module.exports = {
  JWT_SECRET,
  PORT,
MONGODB_URI
};