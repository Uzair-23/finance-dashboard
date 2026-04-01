import { create } from 'zustand';

/**
 * Dark Mode Store - manages dark mode preference
 */
export const useDarkModeStore = create((set) => {
  // Get initial dark mode from localStorage or system preference
  const savedDarkMode = localStorage.getItem('darkMode');
  const initialDarkMode = savedDarkMode !== null ? JSON.parse(savedDarkMode) : true;

  // Set initial HTML class
  if (initialDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return {
    isDarkMode: initialDarkMode,

    /**
     * Toggle dark mode
     */
    toggleDarkMode: () => set((state) => {
      const newDarkMode = !state.isDarkMode;
      localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
      
      if (newDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      return { isDarkMode: newDarkMode };
    }),

    /**
     * Set dark mode explicitly
     */
    setDarkMode: (isDark) => set(() => {
      localStorage.setItem('darkMode', JSON.stringify(isDark));
      
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      return { isDarkMode: isDark };
    }),
  };
});
