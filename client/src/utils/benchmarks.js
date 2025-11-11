import benchmarkData from '../config/benchmark_spending.json';

const categoryMapping = {
  Food: ['Grocery', 'Restaurant'],
  Transportation: ['Gas', 'Travel'],
  Home: ['Retail'],
  Family: ['Education', 'Healthcare'],
  Fun: ['Entertainment'],
};

function isOutlier(userAmount, category) {
  const benchmark = getMonthlyBenchmark(category);
  const ratio = benchmark? userAmount / benchmark : 0;
  return ratio > 1.5
}

function getOverspendingCategories(expenses, categories) {
  const overspending = [];

  categories.forEach(category => {
    const categoryExpenses = expenses.filter(e => e.category === category);
    const total = categoryExpenses.reduce((sum, e) => sum + e.amount, 0);

    if (isOutlier(total, category)) {
      const benchmark = getMonthlyBenchmark(category);
      const ratio = (total / benchmark).toFixed(2);
      overspending.push({
        category,
        amount: total,
        benchmark,
        ratio,
      });
    }
  });
  return overspending;
}

function getMonthlyBenchmark(category) {
  const benchmarkCategories = categoryMapping[category] || [];
  const medianSpending = benchmarkData?.median_spending || {};
  if (benchmarkCategories.length === 0) return 0;

  const total = benchmarkCategories.reduce((sum, benchCat) => {
    return sum + (medianSpending[benchCat] || 0);
  }, 0);

  return total / benchmarkCategories.length;
}

function compareToNational(userAmount, category) {
  const benchmark = getMonthlyBenchmark(category);
  if (!benchmark || benchmark === 0) return null;

  const difference = userAmount - benchmark;
  const percentageDiff = (difference / benchmark) * 100;
  const percentageDiffRounded = Math.round(percentageDiff);
  const differenceRounded = Number(difference.toFixed(2));


  let status;
  if (percentageDiff <= -20) status = 'excellent';
  else if (percentageDiff < 0) status = 'good';
  else if (percentageDiff < 20) status = 'average';
  else if (percentageDiff < 50) status = 'high';
  else status = 'very-high';

  return {
    status,
    userAmount: Number(userAmount.toFixed(2)),
    benchmark: Number(benchmark.toFixed(2)),
    difference: differenceRounded,
    percentageDiff: percentageDiffRounded,
  };
}

function getComparisonMessage(comparison) {
  if (!comparison) return 'No benchmark data available';

  const { status, percentageDiff, difference } = comparison;
  const absPercent = Math.abs(percentageDiff);
  const absDiff = Math.abs(difference).toFixed(2);

  const messages = {
    excellent: `🎉 Great job! You're spending $${absDiff} (${absPercent}%) less than average.`,
    good: `✅ Good — you're spending $${absDiff} (${absPercent}%) below average.`,
    average: `📊 Your spending is about average (${percentageDiff >= 0 ? '+' : ''}${percentageDiff}%).`,
    high: `⚠️ You're spending $${difference.toFixed(2)} (${percentageDiff}%) more than average.`,
    'very-high': `🚨 Alert! You're spending $${difference.toFixed(2)} (${percentageDiff}%) above average.`,
  };

  return messages[status] || 'No message for this status';
}

function getStatusColor(status) {
  const colors = {
    excellent: '#27ae60',
    good: '#2ecc71',
    average: '#f39c12',
    high: '#e67e22',
    'very-high': '#e74c3c',
  };
  return colors[status] || '#95a5a6';
}

export {
  categoryMapping,
  getMonthlyBenchmark,
  compareToNational,
  getComparisonMessage,
  getStatusColor,
  getOverspendingCategories,
  isOutlier
};
