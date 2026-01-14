'use client';

import { useState, useEffect } from 'react';

export default function Header({ selectedHospital, hospitals, onHospitalChange, isDarkMode, onThemeToggle }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const theme = {
    bg: isDarkMode ? 'bg-gradient-to-r from-slate-900 via-blue-900/50 to-slate-900 border-blue-500/30' : 'bg-white border-gray-200 shadow-sm',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-blue-300' : 'text-gray-600',
    select: isDarkMode ? 'bg-slate-700 text-white border-slate-600' : 'bg-gray-100 text-gray-900 border-gray-300',
  };

  return (
    <header className={`${theme.bg} border-b px-6 py-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 ${isDarkMode ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : 'bg-blue-600'} rounded-xl flex items-center justify-center`}>
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${theme.text}`}>ICU Infection Control Dashboard</h1>
            <p className={`text-sm ${theme.textMuted}`}>{selectedHospital?.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Hospital Selector */}
          <select 
            value={selectedHospital?.id}
            onChange={(e) => onHospitalChange(hospitals.find(h => h.id === parseInt(e.target.value)))}
            className={`${theme.select} text-sm px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {hospitals.map(hospital => (
              <option key={hospital.id} value={hospital.id}>{hospital.name}</option>
            ))}
          </select>

          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isDarkMode 
                ? 'bg-slate-700 text-white hover:bg-slate-600' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>

          <div className="text-right">
            <div className={`text-xl font-bold ${theme.text} font-mono`}>
              {currentTime.toLocaleTimeString()}
            </div>
            <div className={`text-xs ${theme.textMuted}`}>
              {currentTime.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className={`${isDarkMode ? 'text-green-400' : 'text-green-600'} font-semibold text-sm`}>LIVE</span>
          </div>
        </div>
      </div>
    </header>
  );
}
