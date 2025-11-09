const usersRouter = require('express').Router();
const auth = require('../middleware/auth');
const { createUser, login, getCurrentUser } = require('../controllers/users');

usersRouter.get('/users/me', auth, getCurrentUser);
usersRouter.post('/signup', createUser);
usersRouter.post('/signin', login);
usersRouter.patch("/users/me", auth);

module.exports = usersRouter;