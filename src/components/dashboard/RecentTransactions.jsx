import Badge from '../common/Badge';
import Card from '../common/Card';
import { formatCurrency, formatDate } from '../../utils/helpers';

/**
 * RecentTransactions Component - Show last 5 transactions
 */
const RecentTransactions = ({ transactions }) => {
  const recent = transactions.slice(-5).reverse();

  if (recent.length === 0) {
    return (
      <Card className="animate-fade-in-up">
        <h3 className="text-lg font-syne font-bold text-white mb-6">Recent Transactions</h3>
        <div className="text-center py-8 text-slate-400 font-dm-sans">
          No transactions yet
        </div>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in-up">
      <h3 className="text-base sm:text-lg font-syne font-bold text-white mb-4 sm:mb-6">Recent Transactions</h3>
      <div className="space-y-1.5">
        {recent.map((txn) => (
          <div
            key={txn.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2.5 sm:p-3 rounded-lg hover:bg-slate-700/30 transition-colors duration-200 gap-1.5"
          >
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-dm-sans font-medium text-white truncate">{txn.merchant}</p>
              <p className="text-xs text-slate-400">{txn.category}</p>
            </div>
            <div className="text-right sm:text-right flex items-baseline gap-2">
              <p className={`text-xs sm:text-sm font-dm-sans font-semibold whitespace-nowrap ${txn.type === 'income' ? 'text-green-400' : 'text-white'}`}>
                {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
              </p>
              <p className="text-xs text-slate-400 hidden sm:inline">{formatDate(txn.date)}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentTransactions;
