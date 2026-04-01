import { useTransactionStore } from '../store/transactionStore';
import { useRoleStore } from '../store/roleStore';
import { useMemo } from 'react';

/**
 * Hook to manage transactions
 * @returns {Object} Transaction state and methods
 */
export const useTransactions = () => {
  const {
    transactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    setSelectedTransaction,
    selectedTransaction,
  } = useTransactionStore();

  return {
    transactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    setSelectedTransaction,
    selectedTransaction,
  };
};

/**
 * Hook to manage filters
 * @returns {Object} Filter state and methods
 */
export const useFilters = () => {
  const { filters, setFilter, resetFilters, transactions } = useTransactionStore();

  const filteredTransactions = useMemo(() => {
    let result = transactions;

    // Filter by type
    if (filters.type !== 'all') {
      result = result.filter(t => t.type === filters.type);
    }

    // Filter by category
    if (filters.category !== 'all') {
      result = result.filter(t => t.category === filters.category);
    }

    // Filter by date range
    if (filters.dateStart) {
      result = result.filter(t => t.date >= filters.dateStart);
    }
    if (filters.dateEnd) {
      const endOfDay = new Date(filters.dateEnd);
      endOfDay.setHours(23, 59, 59, 999);
      result = result.filter(t => t.date <= endOfDay);
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(t =>
        t.merchant.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query)
      );
    }

    return result;
  }, [transactions, filters]);

  return {
    filters,
    setFilter,
    resetFilters,
    filteredTransactions,
  };
};

/**
 * Hook to manage user role
 * @returns {Object} Role state and methods
 */
export const useRole = () => {
  const { currentRole, setRole } = useRoleStore();
  const isAdmin = currentRole === 'Admin';
  const isViewer = currentRole === 'Viewer';

  return {
    currentRole,
    setRole,
    isAdmin,
    isViewer,
  };
};
