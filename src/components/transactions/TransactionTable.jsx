import { ChevronUp, ChevronDown, Trash2, Edit2 } from 'lucide-react';
import { useState } from 'react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Card from '../common/Card';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { useRole } from '../../hooks';

/**
 * TransactionTable Component - Display transactions in a sortable table
 */
const TransactionTable = ({
  transactions,
  onEdit,
  onDelete,
  currentPage = 1,
  itemsPerPage = 10,
  onPageChange,
}) => {
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const { isAdmin } = useRole();

  // Sorting logic
  const sorted = [...transactions].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];

    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    } else if (aVal instanceof Date) {
      aVal = aVal.getTime();
      bVal = bVal.getTime();
    }

    const result = aVal > bVal ? 1 : -1;
    return sortOrder === 'asc' ? result : -result;
  });

  // Pagination
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginated = sorted.slice(startIdx, startIdx + itemsPerPage);
  const totalPages = Math.ceil(sorted.length / itemsPerPage);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const SortIcon = ({ column }) => {
    if (sortBy !== column) return <ChevronDown size={16} className="text-slate-600" />;
    return sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  if (transactions.length === 0) {
    return (
      <Card>
        <div className="text-center py-12 text-slate-400 font-dm-sans">
          <p className="text-lg mb-2">No transactions found</p>
          <p className="text-sm">Try adjusting your filters or add new transactions.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card padding="p-0">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th
                className="px-6 py-4 text-left cursor-pointer hover:bg-slate-700/30"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center gap-2 font-dm-sans font-semibold text-slate-300">
                  Date <SortIcon column="date" />
                </div>
              </th>
              <th
                className="px-6 py-4 text-left cursor-pointer hover:bg-slate-700/30"
                onClick={() => handleSort('merchant')}
              >
                <div className="flex items-center gap-2 font-dm-sans font-semibold text-slate-300">
                  Merchant <SortIcon column="merchant" />
                </div>
              </th>
              <th className="px-6 py-4 text-left font-dm-sans font-semibold text-slate-300">
                Category
              </th>
              <th className="px-6 py-4 text-left font-dm-sans font-semibold text-slate-300">
                Type
              </th>
              <th
                className="px-6 py-4 text-right cursor-pointer hover:bg-slate-700/30"
                onClick={() => handleSort('amount')}
              >
                <div className="flex items-center justify-end gap-2 font-dm-sans font-semibold text-slate-300">
                  Amount <SortIcon column="amount" />
                </div>
              </th>
              {isAdmin && <th className="px-6 py-4 text-right font-dm-sans font-semibold text-slate-300">
                Actions
              </th>}
            </tr>
          </thead>
          <tbody>
            {paginated.map((txn) => (
              <tr key={txn.id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
                <td className="px-6 py-4 font-dm-sans text-sm text-slate-300">
                  {formatDate(txn.date)}
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-dm-sans font-medium text-white">{txn.merchant}</p>
                    <p className="text-xs text-slate-400">{txn.description}</p>
                  </div>
                </td>
                <td className="px-6 py-4 font-dm-sans text-sm text-slate-300">
                  {txn.category}
                </td>
                <td className="px-6 py-4">
                  <Badge variant={txn.type === 'income' ? 'income' : 'expense'} size="sm">
                    {txn.type === 'income' ? 'Income' : 'Expense'}
                  </Badge>
                </td>
                <td className={`px-6 py-4 font-dm-sans font-semibold text-right ${
                  txn.type === 'income' ? 'text-green-400' : 'text-white'
                }`}>
                  {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
                </td>
                {isAdmin && (
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(txn)}
                      className="p-1.5 rounded text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(txn.id)}
                      className="p-1.5 rounded text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="border-t border-slate-700/50 px-6 py-4 flex items-center justify-between">
          <p className="text-sm font-dm-sans text-slate-400">
            Page {currentPage} of {totalPages} ({sorted.length} total)
          </p>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default TransactionTable;
