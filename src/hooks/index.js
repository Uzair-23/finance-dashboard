import { useTransactionStore } from '../store/transactionStore';
import { useRoleStore } from '../store/roleStore';
import { useMemo } from 'react';
import { DEFAULT_FILTERS } from '../data/constants';

/**
 * Hook to manage transactions
 * Atomic selectors prevent unnecessary re-renders by only subscribing to needed state
 * @returns {Object} Transaction state and methods
 */
export const useTransactions = () => {
  const transactions = useTransactionStore(state => state.transactions);
  const addTransaction = useTransactionStore(state => state.addTransaction);
  const editTransaction = useTransactionStore(state => state.editTransaction);
  const deleteTransaction = useTransactionStore(state => state.deleteTransaction);
  const setSelectedTransaction = useTransactionStore(state => state.setSelectedTransaction);
  const selectedTransaction = useTransactionStore(state => state.selectedTransaction);

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
 * Uses atomic selectors to track only filter and transaction changes
 * @returns {Object} Filter state and methods
 */
export const useFilters = () => {
  const filters = useTransactionStore(state => state.filters);
  const transactions = useTransactionStore(state => state.transactions);
  const setFilter = useTransactionStore(state => state.setFilter);
  const resetFilters = useTransactionStore(state => state.resetFilters);

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
 * Uses atomic selectors to track only role changes
 * @returns {Object} Role state and methods
 */
export const useRole = () => {
  const currentRole = useRoleStore(state => state.currentRole);
  const setRole = useRoleStore(state => state.setRole);
  const isAdmin = currentRole === 'Admin';
  const isViewer = currentRole === 'Viewer';

  return {
    currentRole,
    setRole,
    isAdmin,
    isViewer,
  };
};
