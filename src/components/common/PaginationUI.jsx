import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PaginationUI = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = ''
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-between px-4 py-3 bg-slate-900/30 border border-slate-800/60 rounded-xl ${className}`}>
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 border border-slate-800 text-xs font-bold rounded-lg text-slate-400 bg-slate-950/40 hover:bg-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-slate-800 text-xs font-bold rounded-lg text-slate-400 bg-slate-950/40 hover:bg-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>

      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-slate-500 font-medium">
            Page <span className="font-bold text-slate-300">{currentPage}</span> of{' '}
            <span className="font-bold text-slate-300">{totalPages}</span>
          </p>
        </div>

        <div>
          <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px border border-slate-800" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-lg border-r border-slate-850 bg-slate-950/40 hover:bg-slate-900 text-slate-500 hover:text-slate-350 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              const isCurrent = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`relative inline-flex items-center px-3.5 py-2 text-xs font-bold border-r border-slate-850 transition-colors ${
                    isCurrent
                      ? 'z-10 bg-emerald-600/10 text-emerald-400 font-extrabold'
                      : 'bg-slate-950/20 text-slate-450 hover:bg-slate-900 hover:text-slate-300'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-lg bg-slate-950/40 hover:bg-slate-900 text-slate-500 hover:text-slate-350 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PaginationUI;
