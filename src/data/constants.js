/**
 * Centralized constants for the Finance Dashboard
 */

/**
 * Category color palette for charts and visualizations
 * Used by SpendingPieChart and other components
 */
export const CATEGORY_COLORS = {
  Food: '#f97316',
  Transport: '#3b82f6',
  Shopping: '#ec4899',
  Entertainment: '#a855f7',
  Salary: '#10b981',
  Rent: '#64748b',
  Healthcare: '#ef4444',
  Utilities: '#eab308',
  Freelance: '#06b6d4',
};

/**
 * Category configuration with icons and background colors
 * Used for displaying category metadata throughout the app
 */
export const CATEGORY_CONFIG = {
  Food: { icon: '🍔', color: 'bg-orange-500' },
  Transport: { icon: '🚗', color: 'bg-blue-500' },
  Shopping: { icon: '🛍️', color: 'bg-pink-500' },
  Entertainment: { icon: '🎬', color: 'bg-purple-500' },
  Salary: { icon: '💰', color: 'bg-green-500' },
  Rent: { icon: '🏠', color: 'bg-slate-500' },
  Healthcare: { icon: '⚕️', color: 'bg-red-500' },
  Utilities: { icon: '💡', color: 'bg-yellow-500' },
  Freelance: { icon: '💻', color: 'bg-cyan-500' },
};

/**
 * Storage key for Zustand persist middleware
 */
export const STORAGE_KEY = 'finance-dashboard-storage';

/**
 * Default pagination settings
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
};

/**
 * Default filter values
 */
export const DEFAULT_FILTERS = {
  type: 'all',
  category: 'all',
  dateStart: null,
  dateEnd: null,
  searchQuery: '',
};

/**
 * Transaction types
 */
export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
  ALL: 'all',
};

/**
 * User roles
 */
export const USER_ROLES = {
  ADMIN: 'Admin',
  VIEWER: 'Viewer',
};
