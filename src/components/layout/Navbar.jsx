import { Moon, Sun, Bell, FileText } from 'lucide-react';
import { useDarkModeStore } from '../../store/darkModeStore';
import { useRole } from '../../hooks';

/**
 * Navbar Component - Top navigation bar
 */
const Navbar = ({ title = 'Dashboard', onExport }) => {
  const { isDarkMode, toggleDarkMode } = useDarkModeStore();
  const { currentRole, setRole } = useRole();

  const toggleRole = () => {
    const newRole = currentRole === 'Admin' ? 'Viewer' : 'Admin';
    setRole(newRole);
  };

  return (
    <nav className="sticky top-0 z-40 bg-slate-800/80 backdrop-blur border-b border-slate-700/50">
      <div className="flex items-center justify-between h-14 sm:h-16 px-3 sm:px-6">
        {/* Title */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <h1 className="text-base sm:text-2xl font-syne font-bold text-white truncate">{title}</h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Role Toggle Button */}
          <button
            onClick={toggleRole}
            className="hidden sm:flex items-center gap-2 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg transition-colors duration-200 group"
            title="Toggle between Admin and Viewer"
          >
            <span className="text-xs font-dm-sans text-blue-300">Role:</span>
            <span className="text-sm font-dm-sans font-semibold text-blue-400">{currentRole}</span>
          </button>

          {/* Export Button (Admin only) */}
          {currentRole === 'Admin' && onExport && (
            <button
              onClick={onExport}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors duration-200"
              title="Export to CSV"
            >
              <FileText size={18} />
            </button>
          )}

          {/* Notification Bell */}
          <button
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors duration-200"
            title="Notifications"
          >
            <Bell size={20} />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors duration-200"
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* User Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-dm-sans font-bold">
            U
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
