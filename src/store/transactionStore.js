import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { transactions as mockTransactions } from '../data/mockData';
import { STORAGE_KEY, DEFAULT_FILTERS } from '../data/constants';

/**
 * Helper function to ensure dates are Date objects after deserialization
 */
const hydrateDates = (transactions) => {
  return transactions.map(txn => ({
    ...txn,
    date: txn.date instanceof Date ? txn.date : new Date(txn.date),
  }));
};

/**
 * Transaction Store - manages all transaction data and operations
 * Uses Zustand's persist middleware for automatic localStorage management
 */
export const useTransactionStore = create(
  persist(
    (set) => ({
      transactions: mockTransactions.map(txn => ({
        ...txn,
        date: new Date(txn.date),
      })),
      filters: DEFAULT_FILTERS,
      selectedTransaction: null,

      /**
       * Add a new transaction
       */
      addTransaction: (transaction) => set((state) => {
        const newTransaction = {
          ...transaction,
          id: Math.max(...(state.transactions.length > 0 ? state.transactions.map(t => t.id) : [0]), 0) + 1,
          date: new Date(transaction.date),
        };
        return { transactions: [...state.transactions, newTransaction] };
      }),

      /**
       * Edit an existing transaction
       */
      editTransaction: (id, updates) => set((state) => {
        const updatedTransactions = state.transactions.map(txn =>
          txn.id === id ? { ...txn, ...updates, date: new Date(updates.date || txn.date) } : txn
        );
        return { transactions: updatedTransactions };
      }),

      /**
       * Delete a transaction
       */
      deleteTransaction: (id) => set((state) => {
        const updatedTransactions = state.transactions.filter(txn => txn.id !== id);
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
      resetFilters: () => set(() => ({
        filters: DEFAULT_FILTERS,
      })),

      /**
       * Set selected transaction
       */
      setSelectedTransaction: (transaction) => set(() => ({
        selectedTransaction: transaction,
      })),
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        transactions: state.transactions,
        filters: state.filters,
      }),
      merge: (persistedState, currentState) => {
        return {
          ...currentState,
          ...persistedState,
          transactions: persistedState.transactions ? hydrateDates(persistedState.transactions) : currentState.transactions,
        };
      },
    }
  )
);
