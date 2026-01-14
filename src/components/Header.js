'use client';

import { useState, useEffect } from 'react';

export default function Header({ selectedHospital, hospitals, onHospitalChange }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-gradient-to-r from-slate-900 via-blue-900/50 to-slate-900 border-b border-blue-500/30 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <span className="text-3xl">🏥</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">ICU Infection Control Dashboard</h1>
            <p className="text-lg text-blue-300">{selectedHospital?.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Hospital Selector */}
          <select 
            value={selectedHospital?.id}
            onChange={(e) => onHospitalChange(hospitals.find(h => h.id === parseInt(e.target.value)))}
            className="bg-slate-700 text-white text-lg px-4 py-2 rounded-xl border border-slate-600 focus:border-blue-500 focus:outline-none"
          >
            {hospitals.map(hospital => (
              <option key={hospital.id} value={hospital.id}>{hospital.name}</option>
            ))}
          </select>

          <div className="text-right">
            <div className="text-2xl font-bold text-white font-mono">
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-sm text-blue-300">
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-400 font-semibold">LIVE</span>
          </div>
        </div>
      </div>
    </header>
  );
}
