import React from 'react';

const DataTable = ({
  headers = [],
  data = [],
  renderRow,
  loading = false,
  emptyMessage = 'No data available'
}) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40 backdrop-blur-md shadow-xl scrollbar-thin">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-950/50 text-[10px] uppercase font-bold tracking-wider text-slate-400">
            {headers.map((h) => (
              <th key={h.key} className={`py-3.5 px-5 ${h.className || ''}`}>
                {h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/40 text-xs text-slate-350">
          {loading ? (
            <tr>
              <td colSpan={headers.length} className="py-12 text-center text-slate-500 font-semibold animate-pulse">
                Loading data...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="py-12 text-center text-slate-500 font-medium">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => {
              if (renderRow) {
                return renderRow(row, idx);
              }
              return (
                <tr key={row.id || idx} className="hover:bg-slate-950/20 transition-colors">
                  {headers.map((h) => (
                    <td key={h.key} className={`py-3.5 px-5 ${h.className || ''}`}>
                      {row[h.key] !== undefined ? String(row[h.key]) : '—'}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
