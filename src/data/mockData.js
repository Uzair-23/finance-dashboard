// Mock transaction data for the finance dashboard
const generateTransactions = () => {
  const categories = {
    Food: { icon: '🍔', color: 'bg-orange-500' },
    Transport: { icon: '🚗', color: 'bg-blue-500' },
    Shopping: { icon: '🛍️', color: 'bg-pink-500' },
    Entertainment: { icon: '🎬', color: 'bg-purple-500' },
    Salary: { icon: '💰', color: 'bg-green-500' },
    Rent: { icon: '🏠', color: 'bg-slate-500' },
    Healthcare: { icon: '⚕️', color: 'bg-red-500' },
    Utilities: { icon: '💡', color: 'bg-yellow-500' },
    Freelance: { icon: '💻', color: 'bg-cyan-500' },
  };

  const merchants = {
    Food: ['Starbucks', 'McDonald\'s', 'Pizza Hut', 'Dominos', 'Zomato', 'Swiggy', 'Local Restaurant'],
    Transport: ['Uber', 'Ola', 'Parking', 'Gas Station', 'Car Maintenance', 'Metro Card'],
    Shopping: ['Amazon', 'Flipkart', 'H&M', 'Zara', 'Target', 'Uniqlo', 'Myntra'],
    Entertainment: ['Netflix', 'Spotify', 'Movie Tickets', 'Gaming Platform', 'Concert Tickets'],
    Salary: ['Employer Direct', 'Monthly Salary'],
    Rent: ['Landlord', 'Rent Payment'],
    Healthcare: ['City Hospital', 'Pharmacy', 'Clinic', 'Doctor Appointment'],
    Utilities: ['Electric Bill', 'Water Bill', 'Internet Provider', 'Phone Bill'],
    Freelance: ['Client Project', 'Freelance Work', 'Consulting Fee'],
  };

  const transactions = [
    // December 2024
    { id: 1, date: new Date(2024, 11, 1), amount: 250000, category: 'Salary', type: 'income', description: 'Monthly salary', merchant: 'Employer Direct' },
    { id: 2, date: new Date(2024, 11, 2), amount: 50000, category: 'Rent', type: 'expense', description: 'Monthly rent', merchant: 'Landlord' },
    { id: 3, date: new Date(2024, 11, 3), amount: 2500, category: 'Food', type: 'expense', description: 'Lunch', merchant: 'Starbucks' },
    { id: 4, date: new Date(2024, 11, 4), amount: 1200, category: 'Transport', type: 'expense', description: 'Commute', merchant: 'Uber' },
    { id: 5, date: new Date(2024, 11, 5), amount: 8500, category: 'Shopping', type: 'expense', description: 'New winter clothes', merchant: 'H&M' },
    { id: 6, date: new Date(2024, 11, 6), amount: 15000, category: 'Freelance', type: 'income', description: 'Web design project', merchant: 'Client Project' },
    { id: 7, date: new Date(2024, 11, 7), amount: 3200, category: 'Entertainment', type: 'expense', description: 'Netflix subscription', merchant: 'Netflix' },
    { id: 8, date: new Date(2024, 11, 8), amount: 1800, category: 'Food', type: 'expense', description: 'Dinner with friends', merchant: 'Pizza Hut' },
    { id: 9, date: new Date(2024, 11, 10), amount: 4500, category: 'Healthcare', type: 'expense', description: 'Monthly checkup', merchant: 'City Hospital' },
    { id: 10, date: new Date(2024, 11, 12), amount: 5000, category: 'Utilities', type: 'expense', description: 'Electric bill', merchant: 'Electric Bill' },
    { id: 11, date: new Date(2024, 11, 13), amount: 2100, category: 'Food', type: 'expense', description: 'Grocery shopping', merchant: 'Local Restaurant' },
    { id: 12, date: new Date(2024, 11, 14), amount: 12000, category: 'Shopping', type: 'expense', description: 'Electronics purchase', merchant: 'Amazon' },
    { id: 13, date: new Date(2024, 11, 15), amount: 1050, category: 'Transport', type: 'expense', description: 'Gas', merchant: 'Gas Station' },
    { id: 14, date: new Date(2024, 11, 16), amount: 3800, category: 'Entertainment', type: 'expense', description: 'Movie tickets', merchant: 'Movie Tickets' },
    { id: 15, date: new Date(2024, 11, 18), amount: 25000, category: 'Freelance', type: 'income', description: 'Consulting project', merchant: 'Consulting Fee' },

    // January 2025
    { id: 16, date: new Date(2025, 0, 1), amount: 250000, category: 'Salary', type: 'income', description: 'Monthly salary', merchant: 'Employer Direct' },
    { id: 17, date: new Date(2025, 0, 2), amount: 50000, category: 'Rent', type: 'expense', description: 'Monthly rent', merchant: 'Landlord' },
    { id: 18, date: new Date(2025, 0, 3), amount: 3200, category: 'Food', type: 'expense', description: 'Weekly meals', merchant: 'Zomato' },
    { id: 19, date: new Date(2025, 0, 5), amount: 1500, category: 'Transport', type: 'expense', description: 'Ride to airport', merchant: 'Ola' },
    { id: 20, date: new Date(2025, 0, 6), amount: 18000, category: 'Shopping', type: 'expense', description: 'Winter jackets', merchant: 'Zara' },
    { id: 21, date: new Date(2025, 0, 8), amount: 20000, category: 'Freelance', type: 'income', description: 'Freelance project', merchant: 'Freelance Work' },
    { id: 22, date: new Date(2025, 0, 9), amount: 3200, category: 'Entertainment', type: 'expense', description: 'Concert tickets', merchant: 'Concert Tickets' },
    { id: 23, date: new Date(2025, 0, 10), amount: 2400, category: 'Food', type: 'expense', description: 'Office lunch', merchant: 'McDonald\'s' },
    { id: 24, date: new Date(2025, 0, 12), amount: 6000, category: 'Utilities', type: 'expense', description: 'Internet and phone bill', merchant: 'Internet Provider' },
    { id: 25, date: new Date(2025, 0, 14), amount: 5500, category: 'Healthcare', type: 'expense', description: 'Prescription medicine', merchant: 'Pharmacy' },
    { id: 26, date: new Date(2025, 0, 16), amount: 9000, category: 'Shopping', type: 'expense', description: 'Shoes and accessories', merchant: 'Myntra' },
    { id: 27, date: new Date(2025, 0, 18), amount: 1200, category: 'Transport', type: 'expense', description: 'Car maintenance', merchant: 'Car Maintenance' },

    // February 2025
    { id: 28, date: new Date(2025, 1, 1), amount: 250000, category: 'Salary', type: 'income', description: 'Monthly salary', merchant: 'Employer Direct' },
    { id: 29, date: new Date(2025, 1, 2), amount: 50000, category: 'Rent', type: 'expense', description: 'Monthly rent', merchant: 'Landlord' },
    { id: 30, date: new Date(2025, 1, 3), amount: 2800, category: 'Food', type: 'expense', description: 'Coffee and snacks', merchant: 'Starbucks' },
    { id: 31, date: new Date(2025, 1, 5), amount: 22000, category: 'Shopping', type: 'expense', description: 'Valentine\'s gift', merchant: 'Target' },
    { id: 32, date: new Date(2025, 1, 7), amount: 30000, category: 'Freelance', type: 'income', description: 'Graphics design project', merchant: 'Client Project' },
    { id: 33, date: new Date(2025, 1, 8), amount: 3200, category: 'Entertainment', type: 'expense', description: 'Gaming platform subscription', merchant: 'Gaming Platform' },
    { id: 34, date: new Date(2025, 1, 10), amount: 4100, category: 'Food', type: 'expense', description: 'Restaurant dinner', merchant: 'Dominos' },
    { id: 35, date: new Date(2025, 1, 12), amount: 5800, category: 'Utilities', type: 'expense', description: 'Water and electricity', merchant: 'Water Bill' },
    { id: 36, date: new Date(2025, 1, 14), amount: 7500, category: 'Healthcare', type: 'expense', description: 'Dental checkup', merchant: 'Clinic' },
    { id: 37, date: new Date(2025, 1, 16), amount: 1800, category: 'Transport', type: 'expense', description: 'Parking fee', merchant: 'Parking' },
    { id: 38, date: new Date(2025, 1, 18), amount: 14000, category: 'Shopping', type: 'expense', description: 'Home decor items', merchant: 'Flipkart' },
    { id: 39, date: new Date(2025, 1, 20), amount: 2900, category: 'Food', type: 'expense', description: 'Weekend brunch', merchant: 'Local Restaurant' },

    // March 2025
    { id: 40, date: new Date(2025, 2, 1), amount: 250000, category: 'Salary', type: 'income', description: 'Monthly salary', merchant: 'Employer Direct' },
    { id: 41, date: new Date(2025, 2, 2), amount: 50000, category: 'Rent', type: 'expense', description: 'Monthly rent', merchant: 'Landlord' },
    { id: 42, date: new Date(2025, 2, 3), amount: 3100, category: 'Food', type: 'expense', description: 'Lunch delivery', merchant: 'Swiggy' },
    { id: 43, date: new Date(2025, 2, 5), amount: 15000, category: 'Shopping', type: 'expense', description: 'Spring collection', merchant: 'Uniqlo' },
    { id: 44, date: new Date(2025, 2, 7), amount: 18000, category: 'Freelance', type: 'income', description: 'Web development task', merchant: 'Freelance Work' },
    { id: 45, date: new Date(2025, 2, 9), amount: 3200, category: 'Entertainment', type: 'expense', description: 'Spotify premium', merchant: 'Spotify' },
  ];

  return transactions;
};

const transactions = generateTransactions();

// Calculate periodic summaries
const calculateMonthlySummary = () => {
  const summary = {};
  
  transactions.forEach(txn => {
    const monthKey = `${txn.date.getFullYear()}-${String(txn.date.getMonth() + 1).padStart(2, '0')}`;
    if (!summary[monthKey]) {
      summary[monthKey] = { income: 0, expense: 0, balance: 0 };
    }
    if (txn.type === 'income') {
      summary[monthKey].income += txn.amount;
    } else {
      summary[monthKey].expense += txn.amount;
    }
    summary[monthKey].balance = summary[monthKey].income - summary[monthKey].expense;
  });

  return summary;
};

const calculateCategorySummary = () => {
  const summary = {};
  
  transactions.forEach(txn => {
    if (txn.type === 'expense') {
      if (!summary[txn.category]) {
        summary[txn.category] = 0;
      }
      summary[txn.category] += txn.amount;
    }
  });

  return Object.entries(summary)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);
};

const calculateSummaryStats = () => {
  let totalIncome = 0;
  let totalExpense = 0;
  let currentMonthIncome = 0;
  let currentMonthExpense = 0;

  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  transactions.forEach(txn => {
    const txnMonth = `${txn.date.getFullYear()}-${String(txn.date.getMonth() + 1).padStart(2, '0')}`;
    
    if (txn.type === 'income') {
      totalIncome += txn.amount;
      if (txnMonth === currentMonth) currentMonthIncome += txn.amount;
    } else {
      totalExpense += txn.amount;
      if (txnMonth === currentMonth) currentMonthExpense += txn.amount;
    }
  });

  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome * 100).toFixed(1) : 0;

  return {
    totalBalance: totalIncome - totalExpense,
    totalIncome,
    totalExpense,
    currentMonthIncome,
    currentMonthExpense,
    currentMonthBalance: currentMonthIncome - currentMonthExpense,
    savingsRate,
  };
};

export { transactions, calculateMonthlySummary, calculateCategorySummary, calculateSummaryStats };
