function OverspendingAlert({ overspendingCategories}) {
  if (overspendingCategories.length === 0) return null;

  return (
    <div className="overspending-alert">
    <div className="alert-header">
      <span className="alert-icon">⚠️</span>
      <h3>Overspending Alert</h3>
    </div>
    <p className="alert-message">
      You're spending significantly more than average in {overspendingCategories.length === 1 ? 'category' : 'categories'}:
    </p>
    <ul className="alert-list">
      {overspendingCategories.map(({ category, amount, benchmark, ratio }) => (
        <li key={category}>
          <strong>{category}:</strong> ${amount.toFixed(2)}
          <span className="ratio">(${ratio}x average of ${benchmark.toFixed(2)})</span>
        </li>
      ))}
    </ul>
    <p className="alert-tip">💡 Consider reviewing these categories to reduce expenses.</p>
    </div>
  );
}

export default OverspendingAlert;