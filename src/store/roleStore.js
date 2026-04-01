import { create } from 'zustand';

/**
 * Role Store - manages user role (Viewer or Admin)
 */
export const useRoleStore = create((set) => {
  // Try to get role from localStorage, default to 'Viewer'
  const savedRole = localStorage.getItem('userRole') || 'Viewer';

  return {
    currentRole: savedRole,

    /**
     * Set user role
     */
    setRole: (role) => set(() => {
      localStorage.setItem('userRole', role);
      return { currentRole: role };
    }),

    /**
     * Check if current role is Admin
     */
    isAdmin: () => (state) => state.currentRole === 'Admin',
  };
});
