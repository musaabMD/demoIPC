'use client';

import { useState } from 'react';

const classColors = {
  A: { dark: 'bg-red-500/20 border-red-500 text-red-400', light: 'bg-red-100 border-red-400 text-red-700', label: 'Critical' },
  B: { dark: 'bg-yellow-500/20 border-yellow-500 text-yellow-400', light: 'bg-yellow-100 border-yellow-400 text-yellow-700', label: 'Moderate' },
  C: { dark: 'bg-green-500/20 border-green-500 text-green-400', light: 'bg-green-100 border-green-400 text-green-700', label: 'Low' },
};

export default function OutbreakTracker({ outbreaks, isDarkMode }) {
  const [filter, setFilter] = useState('all');

  const filteredOutbreaks = filter === 'all' 
    ? outbreaks 
    : outbreaks.filter(o => o.class === filter);

  const counts = {
    A: outbreaks.filter(o => o.class === 'A').length,
    B: outbreaks.filter(o => o.class === 'B').length,
    C: outbreaks.filter(o => o.class === 'C').length,
  };

  const theme = {
    card: isDarkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-gray-200 shadow-sm',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-600',
    filterBtn: isDarkMode ? 'bg-slate-700 text-gray-300 hover:bg-slate-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  };
  const mode = isDarkMode ? 'dark' : 'light';

  return (
    <div className={`rounded-2xl border-2 p-3 md:p-4 h-full ${theme.card}`}>
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <div className="flex items-center gap-2 md:gap-3">
          <svg className={`w-5 h-5 md:w-6 md:h-6 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className={`text-lg md:text-xl font-bold ${theme.text}`}>Outbreaks</h2>
        </div>
        <span className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold ${
          outbreaks.length > 0 
            ? (isDarkMode ? 'bg-red-500/30 text-red-300' : 'bg-red-100 text-red-600')
            : (isDarkMode ? 'bg-green-500/30 text-green-300' : 'bg-green-100 text-green-600')
        }`}>
          {outbreaks.length} Active
        </span>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-2 md:px-3 py-1 rounded-lg text-xs font-medium transition-colors ${filter === 'all' ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') : theme.filterBtn}`}
        >
          All ({outbreaks.length})
        </button>
        <button
          onClick={() => setFilter('A')}
          className={`px-2 md:px-3 py-1 rounded-lg text-xs font-medium transition-colors ${filter === 'A' ? 'bg-red-600 text-white' : theme.filterBtn}`}
        >
          A ({counts.A})
        </button>
        <button
          onClick={() => setFilter('B')}
          className={`px-2 md:px-3 py-1 rounded-lg text-xs font-medium transition-colors ${filter === 'B' ? 'bg-yellow-600 text-white' : theme.filterBtn}`}
        >
          B ({counts.B})
        </button>
        <button
          onClick={() => setFilter('C')}
          className={`px-2 md:px-3 py-1 rounded-lg text-xs font-medium transition-colors ${filter === 'C' ? 'bg-green-600 text-white' : theme.filterBtn}`}
        >
          C ({counts.C})
        </button>
      </div>

      {/* Outbreaks List */}
      <div className="space-y-2">
        {filteredOutbreaks.length === 0 ? (
          <div className={`text-center py-4 md:py-6 ${isDarkMode ? 'bg-green-900/20' : 'bg-green-50'} rounded-xl`}>
            <p className={`text-sm ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
              {filter === 'all' ? 'No Active Outbreaks' : `No Class ${filter}`}
            </p>
          </div>
        ) : (
          filteredOutbreaks.map((outbreak) => {
            const colors = classColors[outbreak.class];
            return (
              <div key={outbreak.id} className={`${colors[mode]} border-2 rounded-xl p-2 md:p-3`}>
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-sm md:text-base">{outbreak.organism}</span>
                    <span className={`${theme.textMuted} ml-1 md:ml-2 text-xs md:text-sm`}>• {outbreak.area}</span>
                  </div>
                  <span className={`px-1.5 md:px-2 py-0.5 md:py-1 border rounded-full text-xs font-bold shrink-0`}>
                    Class {outbreak.class}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-4 mt-1 md:mt-2 text-xs">
                  <span className={theme.textMuted}>Cases: <span className={theme.text}>{outbreak.cases}</span></span>
                  <span className={theme.textMuted}>Started: <span className={theme.text}>{outbreak.startDate}</span></span>
                  <span className={`px-1.5 md:px-2 py-0.5 rounded ${
                    outbreak.status === 'Active' 
                      ? (isDarkMode ? 'bg-red-500/30 text-red-300' : 'bg-red-100 text-red-600')
                      : (isDarkMode ? 'bg-yellow-500/30 text-yellow-300' : 'bg-yellow-100 text-yellow-600')
                  }`}>
                    {outbreak.status}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
