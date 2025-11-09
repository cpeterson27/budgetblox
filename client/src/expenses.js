import { api } from './api.js';

let expenses = [];

export function initExpenses() {
  // Set today's date
  document.getElementById('expense-date').valueAsDate = new Date();

  // Show add expense form
  document.getElementById('button-add-expense')?.addEventListener('click', () => {
    document.getElementById('add-expense-form').style.display = 'flex';
  });

  document.getElementById('add-expense-close-button')?.addEventListener('click', () => {
    document.getElementById('add-expense-form').style.display = 'none';
  });

  // Handle add expense
  document.getElementById('add-expense-form-element')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const expenseData = {
      name: document.getElementById('expense-details').value.trim(),
      amount: parseFloat(document.getElementById('expense-amount').value),
      category: document.getElementById('expense-category').value,
      date: document.getElementById('expense-date').value
    };

    try {
      await api.addExpense(expenseData);
      document.getElementById('add-expense-form-element').reset();
      document.getElementById('add-expense-form').style.display = 'none';
      await loadAndDisplayExpenses();
    } catch (err) {
      alert('Error adding expense: ' + err.message);
    }
  });

  // Load expenses on init
  loadAndDisplayExpenses();
}

export async function loadAndDisplayExpenses() {
  try {
    const result = await api.getExpenses();
    expenses = result.data?.expenses || [];
    displayExpenses();
  } catch (err) {
    console.error('Error loading expenses:', err);
  }
}

function displayExpenses() {
  const categories = ['Food', 'Transportation', 'Home', 'Family', 'Fun'];
  const container = document.getElementById('expense-tables-container');

  container.innerHTML = categories.map(category => {
    const categoryExpenses = expenses.filter(e => e.category === category);

    const rows = categoryExpenses.map(expense => `
      <ul class="expense-item">
        <li class="expense-item__description">${expense.name}</li>
        <li class="expense-item__date">${new Date(expense.date).toLocaleDateString()}</li>
        <li class="expense-item__amount">$${expense.amount.toFixed(2)}</li>
        <li class="expense-item__actions">
          <button class="btn-delete" data-id="${expense._id}">Delete</button>
        </li>
      </ul>
    `).join('');

    return `
      <p class="block-table-title">${category} Expenses</p>
      <div class="block-table">
        <ul class="blox-table__columns">
          <li class="blox-table__column">${category} Description</li>
          <li class="blox-table__column">Date</li>
          <li class="blox-table__column">Amount</li>
          <li class="blox-table__column">Actions</li>
        </ul>
        ${rows || '<p>No expenses yet</p>'}
      </div>
    `;
  }).join('');

  // Attach delete handlers
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.target.dataset.id;
      if (confirm('Delete this expense?')) {
        try {
          await api.deleteExpense(id);
          await loadAndDisplayExpenses();
        } catch (err) {
          alert('Error deleting expense', err);
        }
      }
    });
  });

  displaySummary();
}

function displaySummary() {
  const totals = { Food: 0, Transportation: 0, Home: 0, Family: 0, Fun: 0 };

  expenses.forEach(e => {
    if (Object.hasOwn(totals, e.category)) {
      totals[e.category] += e.amount;
    } else {
      console.warn(`Unexpected expense category: ${e.category}`);
    }
  });

  const total = Object.values(totals).reduce((sum, val) => sum + val, 0);

  document.getElementById('expense-summary-container').innerHTML = `
    <p class="block-table-title">Blox Balances</p>
    <div class="block-table">
      <ul class="blox-table__columns">
        <li class="blox-table__column">Food</li>
        <li class="blox-table__column">Transportation</li>
        <li class="blox-table__column">Home</li>
        <li class="blox-table__column">Family</li>
        <li class="blox-table__column">Fun</li>
        <li class="blox-table__column">Total</li>
      </ul>
      <ul class="blox-table__columns">
        <li class="blox-table__column">$${totals.Food.toFixed(2)}</li>
        <li class="blox-table__column">$${totals.Transportation.toFixed(2)}</li>
        <li class="blox-table__column">$${totals.Home.toFixed(2)}</li>
        <li class="blox-table__column">$${totals.Family.toFixed(2)}</li>
        <li class="blox-table__column">$${totals.Fun.toFixed(2)}</li>
        <li class="blox-table__column">$${total.toFixed(2)}</li>
      </ul>
    </div>
  `;
}