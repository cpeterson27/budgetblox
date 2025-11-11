import { useState, useEffect } from 'react';
import AddExpenseForm from '../../components/AddExpenseForm/AddExpenseForm';
import OverspendingAlert from '../../components/OverspendingAlert';
import SpendingPieChart from '../../components/SpendingPieChart';
import { api } from '../../utils/api';
import './dashboardpage.css';
import {
  compareToNational,
  getMonthlyBenchmark,
  getStatusColor,
  getComparisonMessage,
  getOverspendingCategories
} from '../../utils/benchmarks';

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
    if (!window.confirm('Delete this expense?')) return;
    try {
      await api.deleteExpense(id);
      setExpenses(prev => prev.filter(e => e._id !== id));
    } catch (err) {
      alert('Error deleting expense', err);
    }
  };

  const categories = ['Food', 'Transportation', 'Home', 'Family', 'Fun'];

  const getCategoryExpenses = (category) =>
    expenses.filter((e) => e.category === category);

  const getCategoryTotal = (category) =>
    getCategoryExpenses(category).reduce((sum, e) => sum + e.amount, 0);

  const overspendingCategories = getOverspendingCategories(expenses, categories);

  return (
    <section className="dashboard-page">
              <button className="button__click-here" onClick={onLogout}>
          Logout
        </button>
      <div className="dashboard-header">
        <p className="login-home-title">Building Blox Balances</p>
      </div>

      <OverspendingAlert overspendingCategories={overspendingCategories} />
      <SpendingPieChart expenses={expenses} categories={categories} />

      <div className="benchmark-section">
        <h2 className="section-title">📊 How You Compare to National Average</h2>
        <div className="benchmark-grid">
          {categories.map((category) => {
            const userTotal = getCategoryTotal(category);
            const comparison = compareToNational(userTotal, category);
            const benchmark = getMonthlyBenchmark(category) || 0;
            const progressValue = benchmark > 0 ? Math.min((userTotal / benchmark) * 100, 200) : 0;

            return (
              <div key={category} className="benchmark-card">
                <h3>{category}</h3>
                <div className="benchmark-amounts">
                  <div className="amount-item">
                    <span className="label">Your Spending:</span>
                    <span className="value user">${userTotal.toFixed(2)}</span>
                  </div>
                  <div className="amount-item">
                    <span className="label">National Avg:</span>
                    <span className="value avg">${benchmark.toFixed(2)}</span>
                  </div>
                </div>
                {comparison ? (
                  <>
                    <div
                      className="comparison-bar"
                      style={{
                        '--progress': `${progressValue}%`,
                        '--bar-color': getStatusColor(comparison.status),
                      }}
                    >
                      <div className="bar-fill" />
                      <div className="bar-marker" style={{ left: '50%' }}>
                        <span>Avg</span>
                      </div>
                    </div>
                    <p
                      className="comparison-message"
                      style={{ color: getStatusColor(comparison.status) }}
                    >
                      {getComparisonMessage(comparison)}
                    </p>
                  </>
                ) : (
                  <p className="comparison-message muted">No benchmark data available</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <button
        className="button__add-new"
        onClick={() => setShowAddExpense(true)}
      >
        Add New Expense
      </button>

      <div className="blox__expenses">
        {categories.map((category) => {
          const categoryExpenses = getCategoryExpenses(category);
          return (
            <div key={category} className="category-block">
              <p className="block__table-titles">{category} Expenses</p>

              <div className="block__table">

                <ul className="blox-table__columns header-row">
                  <li className="blox-table__column">Description</li>
                  <li className="blox-table__column">Date</li>
                  <li className="blox-table__column">Amount</li>
                </ul>

                {categoryExpenses.length === 0 ? (
                  <p className="no-expenses-text">No expenses yet</p>
                ) : (
                  categoryExpenses.map((expense) => (
                    <ul key={expense._id} className="blox-table__columns expense-item">
                      <li className="blox-table__column">{expense.name}</li>
                      <li className="blox-table__column">
                        {expense.date ? new Date(expense.date).toLocaleDateString() : '—'}
                      </li>
                      <li className="blox-table__column">${Number(expense.amount).toFixed(2)}</li>
                      <li className="blox-table__column">
                        <button
                          className="btn-delete"
                          onClick={() => handleDeleteExpense(expense._id)}
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="balances-block">
        <p className="block__blox-title">Blox Balances</p>
        <div className="block__table">
          <ul className="blox-table__columns header-row">
            {categories.map((cat) => (
              <li key={cat} className="blox-table__column">{cat}</li>
            ))}
            <li className="blox-table__column">Total</li>
          </ul>
          <ul className="blox-table__columns values-row">
            {categories.map((cat) => (
              <li key={cat} className="blox-table__column">
                ${getCategoryTotal(cat).toFixed(2)}
              </li>
            ))}
            <li className="blox-table__column">
              ${categories.reduce((sum, cat) => sum + getCategoryTotal(cat), 0).toFixed(2)}
            </li>
          </ul>
        </div>
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

