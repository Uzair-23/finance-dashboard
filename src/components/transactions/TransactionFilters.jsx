import { X } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';
import { useTransactionStore } from '../../store/transactionStore';

/**
 * TransactionFilters Component - Filter transactions by type, category, date, and search
 */
const TransactionFilters = ({ transactions }) => {
  const { filters, setFilter, resetFilters } = useTransactionStore();

  // Get unique categories from transactions
  const categories = [...new Set(transactions.map(t => t.category))].sort();

  const handleSearchChange = (e) => {
    setFilter('searchQuery', e.target.value);
  };

  const handleTypeChange = (type) => {
    setFilter('type', type);
  };

  const handleCategoryChange = (e) => {
    setFilter('category', e.target.value);
  };

  const handleDateStartChange = (e) => {
    setFilter('dateStart', e.target.value ? new Date(e.target.value) : null);
  };

  const handleDateEndChange = (e) => {
    setFilter('dateEnd', e.target.value ? new Date(e.target.value) : null);
  };

  const hasActiveFilters =
    filters.type !== 'all' ||
    filters.category !== 'all' ||
    filters.searchQuery ||
    filters.dateStart ||
    filters.dateEnd;

  return (
    <Card>
      <div className="space-y-3">
        {/* Search */}
        <div>
          <label className="block text-xs sm:text-sm font-dm-sans font-medium text-slate-300 mb-2">
            Search Merchant or Description
          </label>
          <input
            type="text"
            placeholder="Search..."
            value={filters.searchQuery}
            onChange={handleSearchChange}
            className="w-full px-3 sm:px-4 py-2.5 text-sm rounded-lg bg-slate-700/50 border border-slate-600 text-white font-dm-sans placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Type Filter */}
        <div>
          <label className="block text-xs sm:text-sm font-dm-sans font-medium text-slate-300 mb-2">
            Type
          </label>
          <div className="flex flex-wrap gap-2">
            {['all', 'income', 'expense'].map(type => (
              <button
                key={type}
                onClick={() => handleTypeChange(type)}
                className={`px-2.5 sm:px-4 py-2 text-xs sm:text-sm rounded-lg font-dm-sans font-medium transition-colors duration-200 ${
                  filters.type === type
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-xs sm:text-sm font-dm-sans font-medium text-slate-300 mb-2">
            Category
          </label>
          <select
            value={filters.category}
            onChange={handleCategoryChange}
            className="w-full px-3 sm:px-4 py-2.5 text-sm rounded-lg bg-slate-700/50 border border-slate-600 text-white font-dm-sans focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs sm:text-sm font-dm-sans font-medium text-slate-300 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={filters.dateStart ? filters.dateStart.toISOString().split('T')[0] : ''}
              onChange={handleDateStartChange}
              className="w-full px-3 sm:px-4 py-2.5 text-sm rounded-lg bg-slate-700/50 border border-slate-600 text-white font-dm-sans focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-dm-sans font-medium text-slate-300 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={filters.dateEnd ? filters.dateEnd.toISOString().split('T')[0] : ''}
              onChange={handleDateEndChange}
              className="w-full px-3 sm:px-4 py-2.5 text-sm rounded-lg bg-slate-700/50 border border-slate-600 text-white font-dm-sans focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="w-full flex items-center justify-center gap-2"
          >
            <X size={16} />
            Clear Filters
          </Button>
        )}
      </div>
    </Card>
  );
};

export default TransactionFilters;
