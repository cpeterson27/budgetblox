const Expense = require('../models/expense');
const {
  sendBadRequest,
  sendSuccess,
  sendNotFound,
  sendInternalError,
  sendCreate,
} = require('../utils/errors');

async function getExpenses(req, res) {
  try {
    const expenses = await Expense.find({ userId: req.user.userId });
    return sendSuccess(res, { expenses }, 'Expenses retrieved successfully');
  } catch (err) {
    console.error(err);
return sendInternalError(res, 'Error retrieving expenses');
    }
  }

  async function createExpense(req, res) {
    try {
        const {name, amount, category, date, notes } = req.body;
        if (!name || amount == null || !category || !date) {
            return sendBadRequest(res, 'Missing required expense fields');
        }
        const expense = new Expense({
            userId: req.user.userId,
            name,
            amount,
            category,
            date,
            notes
        });
        await expense.save();
        return sendCreate(res, { expense }, 'Expense created successfully');
    } catch (err) {
        console.error(err);
        return sendInternalError(res, 'Error creating expense');
    }
  }

  async function updateExpense(req, res) {
    try {
        const { id } = req.params;
        const expense = await Expense.findOne({_id: id, userId: req.userId});
        if (!expense) {
            return sendNotFound(res, 'Expense not found or accessible');
        }
        const {name, amount, category, date, notes } = req.body;
       if (name !== undefined)  expense.name = name;
        if (amount !== undefined)  expense.amount = amount;
        if (category !== undefined)  expense.category = category;
        if (date !== undefined)  expense.date = date;
        if (notes !== undefined)  expense.notes = notes;
        expense.updatedAt = new Date();
        await expense.save();
        return sendSuccess(res, { expense }, 'Expense updated successfully');
    } catch (err) {
        console.error(err);
        return sendInternalError(res, 'Error updating expense');
    }
  }

async function deleteExpense(req, res) {
  const { id } = req.params;
  try {
    const result = await Expense.deleteOne({ _id: id, user: req.user._id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    return res.status(200).json({ message: 'Expense deleted' });
  } catch (err) {
    console.error("Error in deleteExpense:", err);
    return res.status(500).json({ message: 'Server error deleting expense' });
  }
}

module.exports = {
    getExpenses,
    createExpense,
    updateExpense,
    deleteExpense
};