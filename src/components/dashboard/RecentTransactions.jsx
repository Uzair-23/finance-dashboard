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
      <h3 className="text-lg font-syne font-bold text-white mb-6">Recent Transactions</h3>
      <div className="space-y-3">
        {recent.map((txn) => (
          <div
            key={txn.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/30 transition-colors duration-200"
          >
            <div>
              <p className="text-sm font-dm-sans font-medium text-white">{txn.merchant}</p>
              <p className="text-xs text-slate-400">{txn.category}</p>
            </div>
            <div className="text-right">
              <p className={`text-sm font-dm-sans font-semibold ${txn.type === 'income' ? 'text-green-400' : 'text-white'}`}>
                {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
              </p>
              <p className="text-xs text-slate-400">{formatDate(txn.date)}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentTransactions;
