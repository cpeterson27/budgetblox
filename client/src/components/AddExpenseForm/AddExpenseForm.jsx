import { useState } from 'react';
import './addexpenseform.css';

function AddExpenseForm({ isOpen, onClose, onSubmit }) {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [details, setDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: details,
      amount: parseFloat(amount),
      category,
      date
    });
    setCategory('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
    setDetails('');
  };

  if (!isOpen) return null;

  return (
    <section className="addexpenseform">
      <div className="addexpenseform__overlay addexpenseform__overlay--open">
        <div className="addexpenseform__container">
          <form onSubmit={handleSubmit}>
            <div className="addexpenseform__header">
              <div className="addexpenseform__purpose">Add New Expense</div>
              <button type="button" className="addexpenseform__close-button" onClick={onClose}>X</button>
            </div>

            <div className="addexpenseform__inputs">
              <label className="addexpenseform__label" htmlFor="expense-name">Expense Name</label>
              <input
                className="addexpenseform__input"
                type="text"
                id="expense-name"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
              />

              <label className="addexpenseform__label" htmlFor="expense-amount">Amount</label>
              <input
                className="addexpenseform__input"
                type="number"
                id="expense-amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                step="0.01"
              />

              <label className="addexpenseform__label" htmlFor="expense-category">Category</label>
              <select
                id="expense-category"
                className="addexpenseform__input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">-- Select a category --</option>
                <option value="Food">Food Expense</option>
                <option value="Transportation">Transportation Expense</option>
                <option value="Home">Home Expense</option>
                <option value="Family">Family Expense</option>
                <option value="Fun">Fun Expense</option>
              </select>

              <label className="addexpenseform__label" htmlFor="expense-date">Date</label>
              <input
                className="addexpenseform__input"
                type="date"
                id="expense-date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="addexpenseform__submit">Add Expense</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AddExpenseForm;
