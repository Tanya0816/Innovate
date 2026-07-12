import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import * as Icons from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', to: '/', icon: 'LayoutDashboard' },
  {
    name: 'Environmental',
    icon: 'Leaf',
    subItems: [
      { name: 'Emission Factors', to: '/environmental/emission-factors', icon: 'Calculator' },
      { name: 'Product ESG', to: '/environmental/product-esg', icon: 'ShoppingBag' },
      { name: 'Carbon Transactions', to: '/environmental/carbon-transactions', icon: 'Coins' },
      { name: 'Goals', to: '/environmental/goals', icon: 'Target' },
    ],
  },
  {
    name: 'Social',
    icon: 'Users',
    subItems: [
      { name: 'CSR Activities', to: '/social/csr-activities', icon: 'HeartHandshake' },
      { name: 'Participation', to: '/social/participation', icon: 'Activity' },
    ],
  },
  {
    name: 'Governance',
    icon: 'ShieldCheck',
    subItems: [
      { name: 'Policies', to: '/governance/policies', icon: 'FileText' },
      { name: 'Audits', to: '/governance/audits', icon: 'FileSearch' },
      { name: 'Compliance', to: '/governance/compliance', icon: 'CheckSquare' },
    ],
  },
  {
    name: 'Gamification',
    icon: 'Trophy',
    subItems: [
      { name: 'Challenges', to: '/gamification/challenges', icon: 'Compass' },
      { name: 'Badges', to: '/gamification/badges', icon: 'Award' },
      { name: 'Rewards', to: '/gamification/rewards', icon: 'Gift' },
      { name: 'Leaderboard', to: '/gamification/leaderboard', icon: 'ListOrdered' },
    ],
  },
  { name: 'Reports', to: '/reports', icon: 'FileBarChart2' },
  { name: 'Settings', to: '/settings', icon: 'Settings' },
];

const Sidebar = ({ isOpen, setOpen }) => {
  const { pathname } = useLocation();
  const [expandedSections, setExpandedSections] = useState(() => {
    // Auto expand sections if the current path falls inside them
    const initial = {};
    menuItems.forEach(item => {
      if (item.subItems) {
        const isActive = item.subItems.some(sub => pathname.startsWith(sub.to));
        if (isActive) {
          initial[item.name] = true;
        }
      }
    });
    return initial;
  });

  const toggleSection = (name) => {
    setExpandedSections(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const closeSidebar = () => {
    if (isOpen) setOpen(false);
  };

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-slate-950 border-r border-slate-900 z-50 flex flex-col transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:h-screen`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-900">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 bg-emerald-950/65 text-emerald-400 border border-emerald-800/40 rounded-lg">
              <Icons.Globe size={20} />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              EcoSphere
            </span>
          </div>
          {/* Close button for mobile */}
          <button
            onClick={closeSidebar}
            className="md:hidden text-slate-400 hover:text-slate-200"
          >
            <Icons.X size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-transparent">
          {menuItems.map((item) => {
            const IconComponent = Icons[item.icon] || Icons.HelpCircle;
            const hasSub = !!item.subItems;

            if (hasSub) {
              const isExpanded = !!expandedSections[item.name];
              const isSubActive = item.subItems.some(sub => pathname.startsWith(sub.to));

              return (
                <div key={item.name} className="flex flex-col">
                  <button
                    onClick={() => toggleSection(item.name)}
                    className={`flex items-center justify-between w-full p-2.5 rounded-lg text-sm transition-all duration-150 ${
                      isSubActive
                        ? 'bg-slate-900 text-slate-100 font-semibold'
                        : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <IconComponent
                        size={18}
                        className={`mr-3 ${isSubActive ? 'text-emerald-400' : 'text-slate-500'}`}
                      />
                      <span>{item.name}</span>
                    </div>
                    <Icons.ChevronDown
                      size={14}
                      className={`text-slate-500 transition-transform duration-200 ${
                        isExpanded ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Sub-items list */}
                  <div
                    className={`ml-5 pl-3 border-l border-slate-900 space-y-1 overflow-hidden transition-all duration-200 ${
                      isExpanded ? 'max-h-56 mt-1.5 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {item.subItems.map((sub) => {
                      const SubIcon = Icons[sub.icon] || Icons.Circle;
                      return (
                        <NavLink
                          key={sub.name}
                          to={sub.to}
                          onClick={closeSidebar}
                          className={({ isActive }) =>
                            `flex items-center p-2 rounded-lg text-xs transition-all duration-150 ${
                              isActive
                                ? 'bg-slate-900/80 text-emerald-400 font-semibold border-r-2 border-r-emerald-500'
                                : 'text-slate-400 hover:bg-slate-900/40 hover:text-slate-200'
                            }`
                          }
                        >
                          <SubIcon size={14} className="mr-2.5 text-slate-500" />
                          {sub.name}
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              );
            }

            // Standalone menu item
            const isItemActive = pathname === item.to;
            return (
              <NavLink
                key={item.name}
                to={item.to}
                onClick={closeSidebar}
                className={`flex items-center p-2.5 rounded-lg text-sm transition-all duration-150 ${
                  isItemActive
                    ? 'bg-slate-900 text-emerald-400 font-semibold border-r-2 border-r-emerald-500'
                    : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
                }`}
              >
                <IconComponent
                  size={18}
                  className={`mr-3 ${isItemActive ? 'text-emerald-400' : 'text-slate-500'}`}
                />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer info / Version */}
        <div className="p-4 border-t border-slate-900 flex items-center space-x-3 bg-slate-950">
          <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 font-bold text-xs shadow-md">
            ES
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-slate-300 truncate">EcoSphere Inc.</span>
            <span className="text-[10px] text-slate-500">v1.2.0-prod</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
