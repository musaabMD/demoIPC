'use client';

import { useState, useEffect } from 'react';

export default function Header({ selectedHospital, hospitals, onHospitalChange, isDarkMode, onThemeToggle }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const theme = {
    bg: isDarkMode ? 'bg-slate-900/95 border-slate-700' : 'bg-white border-gray-200 shadow-sm',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-600',
    select: isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-900',
  };

  return (
    <header className={`${theme.bg} border-b sticky top-0 z-50`}>
      <div className="px-3 md:px-6 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Logo & Title */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} flex items-center justify-center`}>
              <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h1 className={`text-lg md:text-2xl font-bold ${theme.text}`}>Public Health Surveillance System</h1>
              <p className={`text-xs md:text-sm ${theme.textMuted}`}>{selectedHospital.name}</p>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-2 md:gap-4 w-full sm:w-auto justify-center sm:justify-end">
            <select 
              value={selectedHospital.id}
              onChange={(e) => onHospitalChange(hospitals.find(h => h.id === parseInt(e.target.value)))}
              className={`${theme.select} px-2 md:px-4 py-2 rounded-lg border text-xs md:text-sm font-medium cursor-pointer w-full sm:w-auto`}
            >
              {hospitals.map(hospital => (
                <option key={hospital.id} value={hospital.id}>{hospital.name}</option>
              ))}
            </select>
            
            <button 
              onClick={onThemeToggle}
              className={`px-2 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap ${
                isDarkMode 
                  ? 'bg-slate-700 text-white hover:bg-slate-600' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            
            {/* Time Display */}
            <div className="text-right hidden sm:block">
              <div className={`text-lg md:text-xl font-mono font-bold ${theme.text}`}>
                {currentTime.toLocaleTimeString()}
              </div>
              <div className={`text-xs ${theme.textMuted} flex items-center gap-1 justify-end`}>
                {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse ml-2"></span>
                <span className="text-green-500 font-medium">LIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
