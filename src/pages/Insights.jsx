import { TrendingUp, ShoppingBag, Store, Activity } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import InsightCard from '../components/insights/InsightCard';
import MonthlyComparisonChart from '../components/insights/MonthlyComparisonChart';
import Card from '../components/common/Card';
import { useTransactionStore } from '../store/transactionStore';
import { formatCurrency, getCategorySpending, getMonthlyComparison } from '../utils/helpers';

/**
 * Insights Page - Financial insights and analytics
 */
const Insights = () => {
  const { transactions } = useTransactionStore();

  // Calculate insights
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  const categorySpending = getCategorySpending(transactions);
  const monthlyData = getMonthlyComparison(transactions);

  // Get highest spending category
  const highestSpendingCategory = categorySpending.length > 0 ? categorySpending[0] : null;

  // Get biggest single expense
  const biggestExpense = expenseTransactions.length > 0 
    ? expenseTransactions.reduce((max, t) => t.amount > max.amount ? t : max)
    : null;

  // Get most frequent merchant
  const merchantCounts = {};
  expenseTransactions.forEach(t => {
    merchantCounts[t.merchant] = (merchantCounts[t.merchant] || 0) + 1;
  });
  const mostFrequentMerchant = Object.entries(merchantCounts).length > 0
    ? Object.entries(merchantCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0]
    : null;

  // Calculate savings trend
  let savingsTrend = null;
  if (monthlyData.length >= 2) {
    const lastMonth = monthlyData[monthlyData.length - 1];
    const prevMonth = monthlyData[monthlyData.length - 2];
    const lastSavings = lastMonth.income - lastMonth.expense;
    const prevSavings = prevMonth.income - prevMonth.expense;
    savingsTrend = lastSavings >= prevSavings;
  }

  // Calculate total expenses by category
  const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div>
      <Navbar title="Insights" />
      <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <InsightCard
            icon={TrendingUp}
            title="Highest Spending"
            value={highestSpendingCategory ? highestSpendingCategory.category : 'N/A'}
            subtext={highestSpendingCategory ? formatCurrency(highestSpendingCategory.amount) : 'No data'}
          />
          <InsightCard
            icon={ShoppingBag}
            title="Biggest Expense"
            value={biggestExpense ? formatCurrency(biggestExpense.amount) : 'N/A'}
            subtext={biggestExpense ? biggestExpense.merchant : 'No data'}
          />
          <InsightCard
            icon={Store}
            title="Most Frequent Merchant"
            value={mostFrequentMerchant || 'N/A'}
            subtext={mostFrequentMerchant ? `${merchantCounts[mostFrequentMerchant]} transactions` : 'No data'}
          />
          <InsightCard
            icon={Activity}
            title="Savings Trend"
            value={savingsTrend ? 'Improving' : 'Declining'}
            trend={{
              isPositive: savingsTrend,
              text: 'vs previous month',
            }}
          />
        </div>

        {/* Monthly Comparison Chart */}
        <MonthlyComparisonChart transactions={transactions} />

        {/* Category Breakdown Table */}
        <Card className="animate-fade-in-up">
          <h3 className="text-base sm:text-lg font-syne font-bold text-white mb-4 sm:mb-6">Category Breakdown</h3>
          
          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
            {categorySpending.length > 0 ? (
              categorySpending.map((item) => {
                const percentage = totalExpenses > 0 ? ((item.amount / totalExpenses) * 100).toFixed(1) : 0;
                return (
                  <div key={item.category} className="bg-slate-700/20 rounded-lg p-4 border border-slate-700/30">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-dm-sans font-semibold text-white">{item.category}</p>
                        <p className="text-xs text-slate-400 mt-1">{formatCurrency(item.amount)}</p>
                      </div>
                      <span className="text-sm font-dm-sans font-semibold text-blue-400">{percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-slate-400 font-dm-sans py-8">
                No expense data available
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="px-6 py-4 text-left font-dm-sans font-semibold text-slate-300">
                    Category
                  </th>
                  <th className="px-6 py-4 text-right font-dm-sans font-semibold text-slate-300">
                    Total Spent
                  </th>
                  <th className="px-6 py-4 text-right font-dm-sans font-semibold text-slate-300">
                    % of Total
                  </th>
                  <th className="px-6 py-4 text-right font-dm-sans font-semibold text-slate-300">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody>
                {categorySpending.length > 0 ? (
                  categorySpending.map((item) => {
                    const percentage = totalExpenses > 0 ? ((item.amount / totalExpenses) * 100).toFixed(1) : 0;
                    return (
                      <tr
                        key={item.category}
                        className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors"
                      >
                        <td className="px-6 py-4 font-dm-sans font-medium text-white">
                          {item.category}
                        </td>
                        <td className="px-6 py-4 text-right font-dm-sans text-slate-300">
                          {formatCurrency(item.amount)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <div className="w-24 h-2 bg-slate-700/50 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500 transition-all duration-300"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="font-dm-sans text-sm text-slate-300 w-12 text-right">
                              {percentage}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right font-dm-sans text-sm text-green-400">
                          ↓
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-slate-400 font-dm-sans">
                      No expense data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Insights;
