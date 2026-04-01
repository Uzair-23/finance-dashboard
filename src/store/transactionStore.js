import { create } from 'zustand';
import { transactions as mockTransactions } from '../data/mockData';

/**
 * Transaction Store - manages all transaction data and operations
 */
export const useTransactionStore = create((set) => {
  // Try to get transactions from localStorage, fall back to mock data
  const savedTransactions = localStorage.getItem('transactions');
  const initialTransactions = savedTransactions 
    ? JSON.parse(savedTransactions).map(txn => ({
        ...txn,
        date: new Date(txn.date), // Ensure date is a Date object
      }))
    : mockTransactions.map(txn => ({
        ...txn,
        date: new Date(txn.date), // Ensure date is a Date object
      }));

  return {
    transactions: initialTransactions,
    filters: {
      type: 'all', // 'all', 'income', 'expense'
      category: 'all',
      dateStart: null,
      dateEnd: null,
      searchQuery: '',
    },
    selectedTransaction: null,

    /**
     * Add a new transaction
     */
    addTransaction: (transaction) => set((state) => {
      const newTransaction = {
        ...transaction,
        id: Math.max(...state.transactions.map(t => t.id), 0) + 1,
        date: new Date(transaction.date),
      };
      const updatedTransactions = [...state.transactions, newTransaction];
      localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
      return { transactions: updatedTransactions };
    }),

    /**
     * Edit an existing transaction
     */
    editTransaction: (id, updates) => set((state) => {
      const updatedTransactions = state.transactions.map(txn =>
        txn.id === id ? { ...txn, ...updates, date: new Date(updates.date || txn.date) } : txn
      );
      localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
      return { transactions: updatedTransactions };
    }),

    /**
     * Delete a transaction
     */
    deleteTransaction: (id) => set((state) => {
      const updatedTransactions = state.transactions.filter(txn => txn.id !== id);
      localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
      return { transactions: updatedTransactions };
    }),

    /**
     * Set filter values
     */
    setFilter: (filterKey, value) => set((state) => ({
      filters: {
        ...state.filters,
        [filterKey]: value,
      },
    })),

    /**
     * Reset all filters
     */
    resetFilters: () => set({
      filters: {
        type: 'all',
        category: 'all',
        dateStart: null,
        dateEnd: null,
        searchQuery: '',
      },
    }),

    /**
     * Set selected transaction
     */
    setSelectedTransaction: (transaction) => set({
      selectedTransaction: transaction,
    }),

    /**
     * Get filtered transactions
     */
    getFilteredTransactions: () => {
      return (state) => {
        let filtered = state.transactions;

        // Filter by type
        if (state.filters.type !== 'all') {
          filtered = filtered.filter(t => t.type === state.filters.type);
        }

        // Filter by category
        if (state.filters.category !== 'all') {
          filtered = filtered.filter(t => t.category === state.filters.category);
        }

        // Filter by date range
        if (state.filters.dateStart) {
          filtered = filtered.filter(t => t.date >= state.filters.dateStart);
        }
        if (state.filters.dateEnd) {
          filtered = filtered.filter(t => t.date <= state.filters.dateEnd);
        }

        // Filter by search query
        if (state.filters.searchQuery) {
          const query = state.filters.searchQuery.toLowerCase();
          filtered = filtered.filter(t =>
            t.merchant.toLowerCase().includes(query) ||
            t.description.toLowerCase().includes(query)
          );
        }

        return filtered;
      };
    },
  };
});
