require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');
const authRoutes = require('./routes/authRoutes');
const { sendNotFound } = require('./utils/errors');

const uri = process.env.MONGODB_URI;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL
        : 'http://localhost:5173',
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRouter);
app.use('/api/expenses', expensesRouter);

mongoose.set('strictQuery', false);
mongoose
  .connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(console.error);

app.use((req, res) => {
  res.status(sendNotFound).json({ message: 'Requested resource not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
module.exports = app;
