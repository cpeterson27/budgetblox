function SpendingPieChart({ expenses, categories }) {

  const categoryTotals = categories.map(category => {
    const total = expenses
      .filter(e => e.category === category)
      .reduce((sum, e) => sum + e.amount, 0);
    return { category, total };
  });

  const totalSpending = categoryTotals.reduce((sum, ct) => sum + ct.total, 0);

  const colors = {
    'Food': '#FF6B9D',
    'Transportation': '#C8A2D5',
    'Home': '#9ADCFF',
    'Family': '#FEC868',
    'Fun': '#A8E6A3'
  };

  return (
    <div className="pie-chart-container">
      <h3>Your Spending Distribution</h3>
      <svg viewBox="0 0 200 200" className="pie-chart">
        {(() => {
          let currentAngle = 0;
          return categoryTotals.map(({ category, total }) => {
            if (total === 0) return null;

            const percentage = (total / totalSpending) * 100;
            const angle = (percentage / 100) * 360;
            const startAngle = currentAngle;
            currentAngle += angle;

            const startRad = (startAngle - 90) * (Math.PI / 180);
            const endRad = (currentAngle - 90) * (Math.PI / 180);

            const x1 = 100 + 80 * Math.cos(startRad);
            const y1 = 100 + 80 * Math.sin(startRad);
            const x2 = 100 + 80 * Math.cos(endRad);
            const y2 = 100 + 80 * Math.sin(endRad);

            const largeArc = angle > 180 ? 1 : 0;

            const path = `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`;

            return (
              <g key={category}>
                <path
                  d={path}
                  fill={colors[category]}
                  stroke="white"
                  strokeWidth="2"
                />
                <text
                  x={100 + 50 * Math.cos((startRad + endRad) / 2)}
                  y={100 + 50 * Math.sin((startRad + endRad) / 2)}
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                >
                  {percentage.toFixed(1)}%
                </text>
              </g>
            );
          });
        })()}
      </svg>
      <div className="pie-legend">
        {categoryTotals.map(({ category, total }) => (
          total > 0 && (
            <div key={category} className="legend-item">
              <span
                className="legend-color"
                style={{ backgroundColor: colors[category] }}
              ></span>
              <span className="legend-label">{category}</span>
              <span className="legend-value">${total.toFixed(2)}</span>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default SpendingPieChart;