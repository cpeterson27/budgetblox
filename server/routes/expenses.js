const express = require('express');

const expensesRouter = express.Router();
const auth = require('../middleware/auth');
const { createExpense, getExpenses, updateExpense, deleteExpense } = require('../controllers/expenses');

expensesRouter.use(auth);
expensesRouter.get('/', getExpenses);
expensesRouter.post('/', createExpense);
expensesRouter.put('/:id', updateExpense);
expensesRouter.delete('/:id', deleteExpense);

module.exports = expensesRouter;