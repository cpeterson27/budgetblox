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

app.use((req, res) => sendNotFound(res, 'Requested resource not found'));

mongoose.set('strictQuery', false);

mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log('MongoDB connected successfully');

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

module.exports = app;
