require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');
const authRoutes = require('./routes/authRoutes');
const { sendNotFound } = require('./utils/errors');
const { MONGODB_URI, PORT } = require('./utils/config');

const uri = MONGODB_URI;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL
        : 'http://localhost:5176',
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRouter);
app.use('/api/expenses', expensesRouter);

mongoose.set('strictQuery', false);
mongoose
  .connect(uri, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  })
  .then(() => console.log('MongoDB connected'))
  .catch(console.error);

app.use((req, res) => sendNotFound(res, 'Requested resource not found'));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
module.exports = app;
