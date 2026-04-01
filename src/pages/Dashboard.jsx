import { useEffect, useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Target } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import SummaryCard from '../components/dashboard/SummaryCard';
import BalanceTrendChart from '../components/dashboard/BalanceTrendChart';
import SpendingPieChart from '../components/dashboard/SpendingPieChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import Card from '../components/common/Card';
import { useTransactionStore } from '../store/transactionStore';
import { getPercentageChange } from '../utils/helpers';
import { transactions as mockTransactions } from '../data/mockData';

/**
 * Dashboard Page - Main dashboard with summary cards and charts
 */
const Dashboard = () => {
  const { transactions } = useTransactionStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Calculate current and previous month summary
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const previousMonth = `${now.getFullYear()}-${String(now.getMonth()).padStart(2, '0')}`;

  const getCurrentMonthData = () => {
    return transactions.filter(txn => {
      const date = txn.date instanceof Date ? txn.date : new Date(txn.date);
      const txnMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      return txnMonth === currentMonth;
    });
  };

  const getPreviousMonthData = () => {
    return transactions.filter(txn => {
      const date = txn.date instanceof Date ? txn.date : new Date(txn.date);
      const txnMonth = `${date.getFullYear()}-${String(date.getMonth()).padStart(2, '0')}`;
      return txnMonth === previousMonth;
    });
  };

  const calculateMonthSummary = (txns) => {
    let income = 0, expense = 0;
    txns.forEach(t => {
      if (t.type === 'income') income += t.amount;
      else expense += t.amount;
    });
    return { income, expense, balance: income - expense, savingsRate: income > 0 ? ((income - expense) / income * 100).toFixed(1) : 0 };
  };

  const currentData = calculateMonthSummary(getCurrentMonthData());
  const previousData = calculateMonthSummary(getPreviousMonthData());

  const totalBalance = transactions.reduce((sum, t) => {
    return t.type === 'income' ? sum + t.amount : sum - t.amount;
  }, 0);

  const incomeChange = getPercentageChange(currentData.income, previousData.income);
  const expenseChange = getPercentageChange(currentData.expense, previousData.expense);
  const balanceChange = getPercentageChange(currentData.balance, previousData.balance);

  if (isLoading) {
    return (
      <div>
        <Navbar title="Dashboard" />
        <div className="flex-1 p-6 space-y-6">
          {/* Loading skeletons */}
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-slate-700/50 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar title="Dashboard" />
      <div className="flex-1 p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard
            icon={DollarSign}
            label="Total Balance"
            value={totalBalance}
            change={balanceChange}
          />
          <SummaryCard
            icon={TrendingUp}
            label="Monthly Income"
            value={currentData.income}
            change={incomeChange}
          />
          <SummaryCard
            icon={TrendingDown}
            label="Monthly Expenses"
            value={currentData.expense}
            change={expenseChange}
          />
          <SummaryCard
            icon={Target}
            label="Savings Rate"
            value={currentData.savingsRate}
            change={getPercentageChange(currentData.savingsRate, previousData.savingsRate)}
            percentage
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BalanceTrendChart transactions={transactions} />
          <SpendingPieChart transactions={transactions} />
        </div>

        {/* Recent Transactions */}
        <RecentTransactions transactions={transactions} />
      </div>
    </div>
  );
};

export default Dashboard;
