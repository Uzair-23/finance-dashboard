import { useState } from 'react';
import { Menu, X, BarChart3, ArrowLeftRight, TrendingUp, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRole } from '../../hooks';
import Card from '../common/Card';

/**
 * Sidebar Component - Main navigation sidebar
 */
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentRole, setRole } = useRole();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: BarChart3 },
    { name: 'Transactions', path: '/transactions', icon: ArrowLeftRight },
    { name: 'Insights', path: '/insights', icon: TrendingUp },
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const toggleRole = () => {
    const newRole = currentRole === 'Admin' ? 'Viewer' : 'Admin';
    setRole(newRole);
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 md:hidden p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-0 md:inset-auto z-30 w-64 h-screen md:h-auto bg-slate-800/95 backdrop-blur border-r border-slate-700/50 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Logo */}
          <div className="mb-12 mt-12 md:mt-0">
            <h2 className="text-2xl font-syne font-bold text-white">FinDash</h2>
            <p className="text-xs text-slate-400 mt-1">Financial Dashboard</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-dm-sans">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Role Switcher */}
          <div className="space-y-3 border-t border-slate-700/50 pt-4">
            <Card padding="p-3" className="bg-slate-700/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-dm-sans text-slate-400">Current Role</p>
                  <p className="text-sm font-dm-sans font-semibold text-blue-400">{currentRole}</p>
                </div>
              </div>
            </Card>

            <button
              onClick={toggleRole}
              className="w-full px-4 py-2 rounded-lg bg-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors duration-200 font-dm-sans text-sm"
            >
              Switch to {currentRole === 'Admin' ? 'Viewer' : 'Admin'}
            </button>

            {/* Logout (placeholder) */}
            <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors duration-200">
              <LogOut size={18} />
              <span className="font-dm-sans text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
