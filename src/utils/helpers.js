/**
 * Format currency to Indian Rupee with ₹ symbol
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  if (typeof amount !== 'number') return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format date to readable format: "15 Jan 2025"
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

/**
 * Format date to month-year format: "Jan 2025"
 * @param {Date} date - The date to format
 * @returns {string} Formatted month-year string
 */
export const formatMonthYear = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return new Intl.DateTimeFormat('en-IN', {
    month: 'short',
    year: 'numeric',
  }).format(date);
};

/**
 * Get percentage change between two values
 * @param {number} current - Current value
 * @param {number} previous - Previous value
 * @returns {number} Percentage change
 */
export const getPercentageChange = (current, previous) => {
  if (previous === 0) return 0;
  return ((current - previous) / previous * 100).toFixed(1);
};

/**
 * Export transactions to CSV
 * @param {Array} transactions - Array of transaction objects
 * @param {string} filename - Name of the output file
 */
export const exportToCSV = (transactions, filename = 'transactions.csv') => {
  if (!transactions || transactions.length === 0) {
    alert('No transactions to export');
    return;
  }

  const headers = ['Date', 'Merchant', 'Category', 'Type', 'Amount', 'Description'];
  const rows = transactions.map(txn => [
    formatDate(txn.date),
    txn.merchant,
    txn.category,
    txn.type,
    txn.amount,
    txn.description,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Get unique months from transaction list
 * @param {Array} transactions - Array of transaction objects
 * @returns {Array} Array of month strings
 */
export const getMonthsFromTransactions = (transactions) => {
  const months = new Set();
  transactions.forEach(txn => {
    const date = txn.date instanceof Date ? txn.date : new Date(txn.date);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    months.add(month);
  });
  return Array.from(months).sort();
};

/**
 * Calculate balance trend over months
 * @param {Array} transactions - Array of transaction objects
 * @returns {Array} Array of objects with month and balance
 */
export const calculateBalanceTrend = (transactions) => {
  const monthlyData = {};

  transactions.forEach(txn => {
    const date = txn.date instanceof Date ? txn.date : new Date(txn.date);
    const month = date.getFullYear().toString() + '-' + String(date.getMonth() + 1).padStart(2, '0');
    if (!monthlyData[month]) {
      monthlyData[month] = { income: 0, expense: 0 };
    }
    if (txn.type === 'income') {
      monthlyData[month].income += txn.amount;
    } else {
      monthlyData[month].expense += txn.amount;
    }
  });

  return Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({
      month: formatMonthYear(new Date(month + '-01')),
      balance: data.income - data.expense,
      income: data.income,
      expense: data.expense,
    }));
};

/**
 * Get spending by category
 * @param {Array} transactions - Array of transaction objects
 * @returns {Array} Array of objects with category and amount
 */
export const getCategorySpending = (transactions) => {
  const spending = {};

  transactions
    .filter(txn => txn.type === 'expense')
    .forEach(txn => {
      if (!spending[txn.category]) {
        spending[txn.category] = 0;
      }
      spending[txn.category] += txn.amount;
    });

  return Object.entries(spending)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
};

/**
 * Get month-over-month comparison
 * @param {Array} transactions - Array of transaction objects
 * @returns {Array} Array of objects with month, income, and expense
 */
export const getMonthlyComparison = (transactions) => {
  const monthlyData = {};

  transactions.forEach(txn => {
    const date = txn.date instanceof Date ? txn.date : new Date(txn.date);
    const month = formatMonthYear(date);
    if (!monthlyData[month]) {
      monthlyData[month] = { income: 0, expense: 0 };
    }
    if (txn.type === 'income') {
      monthlyData[month].income += txn.amount;
    } else {
      monthlyData[month].expense += txn.amount;
    }
  });

  return Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({
      month,
      income: data.income,
      expense: data.expense,
    }))
    .slice(-4); // Get last 4 months
};
