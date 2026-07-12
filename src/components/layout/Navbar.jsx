import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { useEcoSphere } from '../../services/EcoSphereContext';

const Navbar = ({ onOpenSidebar }) => {
  const { pathname } = useLocation();
  const { leaderboard, recentActivities } = useEcoSphere();
  const [showNotifications, setShowNotifications] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Find current user's XP
  const currentUser = leaderboard.find(u => u.isCurrentUser) || { xp: 0, employee: 'User' };

  // Set default theme to dark
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Generate breadcrumb title from path
  const getBreadcrumbs = () => {
    const parts = pathname.split('/').filter(x => x);
    if (parts.length === 0) return [{ name: 'EcoSphere Dashboard', active: true }];

    return parts.map((part, index) => {
      const name = part
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      return {
        name,
        active: index === parts.length - 1
      };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="sticky top-0 z-30 h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 px-6 flex items-center justify-between">
      {/* Breadcrumbs and Menu Toggle */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onOpenSidebar}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-slate-200 focus:outline-none"
        >
          <Icons.Menu size={20} />
        </button>

        <div className="flex items-center space-x-2 text-sm">
          <Icons.Home size={16} className="text-slate-500" />
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.name}>
              <Icons.ChevronRight size={12} className="text-slate-600" />
              <span
                className={`font-semibold tracking-wide ${
                  crumb.active 
                    ? 'text-slate-200 font-bold' 
                    : 'text-slate-400'
                }`}
              >
                {crumb.name}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Right Side Header Items */}
      <div className="flex items-center space-x-4">
        {/* User XP Badge */}
        <div className="hidden sm:flex items-center bg-emerald-950/40 border border-emerald-800/40 rounded-full px-3.5 py-1.5 text-xs text-emerald-400 font-semibold shadow-inner">
          <Icons.Zap size={14} className="mr-1.5 text-emerald-400 animate-pulse animate-duration-1000" />
          <span>{currentUser.xp.toLocaleString()} XP</span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition-colors"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? <Icons.Sun size={18} /> : <Icons.Moon size={18} />}
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition-colors"
          >
            <Icons.Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-slate-950" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50 py-1">
                <div className="px-4 py-2 border-b border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Recent Activity logs
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold cursor-pointer hover:underline">
                    Mark all read
                  </span>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {recentActivities.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-500">
                      No notifications
                    </div>
                  ) : (
                    recentActivities.map((act) => (
                      <div
                        key={act.id}
                        className="px-4 py-3 hover:bg-slate-950 border-b border-slate-800/40 last:border-0 flex items-start space-x-3 transition-colors"
                      >
                        <div className="mt-0.5">
                          {act.type === 'success' && (
                            <Icons.CheckCircle2 className="text-emerald-400" size={14} />
                          )}
                          {act.type === 'warning' && (
                            <Icons.AlertTriangle className="text-amber-400" size={14} />
                          )}
                          {act.type === 'danger' && (
                            <Icons.AlertCircle className="text-rose-400" size={14} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-slate-300 leading-normal">{act.text}</p>
                          <span className="text-[10px] text-slate-500 block mt-1">{act.time}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-2.5 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 font-bold text-xs uppercase shadow-sm">
            {currentUser.employee.substring(0, 2)}
          </div>
          <div className="hidden lg:flex flex-col min-w-0 text-left">
            <span className="text-xs font-bold text-slate-300 truncate">
              {currentUser.employee}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">Sustainability Lead</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
