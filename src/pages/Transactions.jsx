import { useState } from 'react';
import { Plus, Download } from 'lucide-react';
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
      <div className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-syne font-bold text-white">All Transactions</h2>
            <p className="text-slate-400 font-dm-sans mt-1">
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

        {/* Table */}
        <TransactionTable
          transactions={filteredTransactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={isAdmin ? handleAddClick : null}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          itemsPerPage={10}
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
