import { useState } from 'react';
import { Plus, Download, Sliders } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import TransactionTable from '../components/transactions/TransactionTable';
import TransactionFilters from '../components/transactions/TransactionFilters';
import AddEditModal from '../components/transactions/AddEditModal';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { useFilters, useRole, useTransactions } from '../hooks';
import { exportToCSV } from '../utils/helpers';

/**
 * Transactions Page - Manage and view all transactions
 */
const Transactions = () => {
  const { transactions, deleteTransaction, setSelectedTransaction, selectedTransaction } = useTransactions();
  const { filteredTransactions, filters } = useFilters();
  const { isAdmin } = useRole();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showSortMenu, setShowSortMenu] = useState(false);

  const sortOptions = [
    { label: 'Date', value: 'date' },
    { label: 'Merchant', value: 'merchant' },
    { label: 'Amount', value: 'amount' },
    { label: 'Category', value: 'category' },
    { label: 'Type', value: 'type' },
  ];

  const handleSortChange = (column, order) => {
    setSortBy(column);
    setSortOrder(order);
    setShowSortMenu(false);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  const handleAddClick = () => {
    setSelectedTransaction(null);
    setIsModalOpen(true);
  };

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const handleExport = () => {
    exportToCSV(filteredTransactions, 'transactions.csv');
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <div>
      <Navbar title="Transactions" onExport={isAdmin ? handleExport : null} />
      <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-syne font-bold text-white">All Transactions</h2>
            <p className="text-xs sm:text-sm text-slate-400 font-dm-sans mt-1">
              {filteredTransactions.length} of {transactions.length} transaction(s)
            </p>
          </div>
          {isAdmin && (
            <Button
              variant="primary"
              onClick={handleAddClick}
              className="flex items-center gap-2"
            >
              <Plus size={18} />
              Add Transaction
            </Button>
          )}
        </div>

        {/* Filters */}
        <TransactionFilters transactions={transactions} />

        {/* Sorting Control */}
        <div className="relative inline-block w-full sm:w-auto">
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-600 transition-colors duration-200 font-dm-sans text-sm w-full sm:w-auto"
          >
            <Sliders size={16} />
            Sort by: <span className="font-semibold text-blue-400 capitalize">{sortBy}</span>
          </button>

          {/* Sort Dropdown Menu */}
          {showSortMenu && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 z-10"
                onClick={() => setShowSortMenu(false)}
              />
              <div className="absolute top-full mt-2 left-0 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-20 min-w-[200px] sm:min-w-[220px]">
                <div className="p-2 space-y-1">
                  {sortOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleSortChange(option.value, sortBy === option.value && sortOrder === 'asc' ? 'desc' : 'asc')}
                      className={`w-full text-left px-3 py-2.5 rounded transition-colors font-dm-sans text-sm ${
                        sortBy === option.value
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'text-slate-300 hover:bg-slate-700/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option.label}</span>
                        {sortBy === option.value && (
                          <span className="text-xs font-semibold">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        <TransactionTable
          transactions={filteredTransactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={isAdmin ? handleAddClick : null}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          itemsPerPage={10}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />
      </div>

      {/* Modal */}
      <AddEditModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        transaction={selectedTransaction}
      />
    </div>
  );
};

export default Transactions;
