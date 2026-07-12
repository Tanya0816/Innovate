import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const PageLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Navbar */}
        <Navbar onOpenSidebar={() => setSidebarOpen(true)} />

        {/* Content Panel */}
        <main className="flex-1 overflow-y-auto bg-slate-950 p-6 md:p-8 scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-transparent">
          <div className="mx-auto max-w-7xl space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PageLayout;
