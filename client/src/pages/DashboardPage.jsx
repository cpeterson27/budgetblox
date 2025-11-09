import { useState, useEffect } from 'react';
import AddExpenseForm from '../components/AddExpenseForm/AddExpenseForm';
import { api } from '../utils/api';

function DashboardPage({ onLogout }) {
  const [expenses, setExpenses] = useState([]);
  const [showAddExpense, setShowAddExpense] = useState(false);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const result = await api.getExpenses();
      setExpenses(result.data?.expenses || []);
    } catch (err) {
      console.error('Error loading expenses:', err);
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      await api.addExpense(expenseData);
      setShowAddExpense(false);
      await loadExpenses();
    } catch (err) {
      alert('Error adding expense: ' + err.message);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (!confirm('Delete this expense?')) return;
    try {
      await api.deleteExpense(id);
      await loadExpenses();
    } catch (err) {
      alert('Error deleting expense', err);
    }
  };

  const getCategoryExpenses = (category) => {
    return expenses.filter(e => e.category === category);
  };

  const getCategoryTotal = (category) => {
    return getCategoryExpenses(category).reduce((sum, e) => sum + e.amount, 0);
  };

  const categories = ['Food', 'Transportation', 'Home', 'Family', 'Fun'];

  return (
    <section className="user-account-home">
      <div className="dashboard-header">
        <p className="login-home-title">Building Blox Balances</p>
        <button className="button-click-here" onClick={onLogout}>Logout</button>
      </div>

      <div className="blox">
        {categories.map(cat => (
          <div key={cat} className="blox__icon">{cat} Expenses</div>
        ))}
      </div>

      <button className="button-click-here" onClick={() => setShowAddExpense(true)}>
        Add New Expense
      </button>

      {categories.map(category => {
        const categoryExpenses = getCategoryExpenses(category);
        return (
          <div key={category}>
            <p className="block-table-title">{category} Expenses</p>
            <div className="block-table">
              <ul className="blox-table__columns">
                <li className="blox-table__column">{category} Description</li>
                <li className="blox-table__column">Date</li>
                <li className="blox-table__column">Amount</li>
                <li className="blox-table__column">Actions</li>
              </ul>
              {categoryExpenses.length === 0 ? (
                <p>No expenses yet</p>
              ) : (
                categoryExpenses.map(expense => (
                  <ul key={expense._id} className="expense-item">
                    <li className="expense-item__description">{expense.name}</li>
                    <li className="expense-item__date">
                      {new Date(expense.date).toLocaleDateString()}
                    </li>
                    <li className="expense-item__amount">${expense.amount.toFixed(2)}</li>
                    <li className="expense-item__actions">
                      <button onClick={() => handleDeleteExpense(expense._id)}>Delete</button>
                    </li>
                  </ul>
                ))
              )}
            </div>
          </div>
        );
      })}

      <p className="block-table-title">Blox Balances</p>
      <div className="block-table">
        <ul className="blox-table__columns">
          {categories.map(cat => (
            <li key={cat} className="blox-table__column">{cat}</li>
          ))}
          <li className="blox-table__column">Total</li>
        </ul>
        <ul className="blox-table__columns">
          {categories.map(cat => (
            <li key={cat} className="blox-table__column">${getCategoryTotal(cat).toFixed(2)}</li>
          ))}
          <li className="blox-table__column">
            ${categories.reduce((sum, cat) => sum + getCategoryTotal(cat), 0).toFixed(2)}
          </li>
        </ul>
      </div>

      <AddExpenseForm
        isOpen={showAddExpense}
        onClose={() => setShowAddExpense(false)}
        onSubmit={handleAddExpense}
      />
    </section>
  );
}

export default DashboardPage;