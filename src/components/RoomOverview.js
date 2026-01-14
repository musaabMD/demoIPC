'use client';

import { useState } from 'react';

const ISOLATION_COLORS = {
  'Airborne': { dark: 'bg-red-500/30 border-red-500 text-red-400', light: 'bg-red-100 border-red-400 text-red-700' },
  'Droplet': { dark: 'bg-blue-500/30 border-blue-500 text-blue-400', light: 'bg-blue-100 border-blue-400 text-blue-700' },
  'Contact': { dark: 'bg-yellow-500/30 border-yellow-500 text-yellow-400', light: 'bg-yellow-100 border-yellow-400 text-yellow-700' },
  'Protective': { dark: 'bg-green-500/30 border-green-500 text-green-400', light: 'bg-green-100 border-green-400 text-green-700' },
  'None': { dark: 'bg-slate-700/50 border-slate-600 text-gray-400', light: 'bg-gray-100 border-gray-300 text-gray-600' },
};

export default function RoomOverview({ patients, isDarkMode }) {
  const [filter, setFilter] = useState('all');

  const occupiedPatients = patients.filter(p => !p.empty);
  const emptyBeds = patients.filter(p => p.empty);

  // Filter patients based on selection
  const getFilteredPatients = () => {
    if (filter === 'all') return occupiedPatients;
    if (filter === 'airborne') return occupiedPatients.filter(p => p.isolation === 'Airborne');
    if (filter === 'droplet') return occupiedPatients.filter(p => p.isolation === 'Droplet');
    if (filter === 'contact') return occupiedPatients.filter(p => p.isolation === 'Contact');
    if (filter === 'protective') return occupiedPatients.filter(p => p.isolation === 'Protective');
    if (filter === 'isolated') return occupiedPatients.filter(p => p.isolation !== 'None');
    if (filter === 'none') return occupiedPatients.filter(p => p.isolation === 'None');
    return occupiedPatients;
  };

  const filteredPatients = getFilteredPatients();

  // Count by isolation type
  const counts = {
    airborne: occupiedPatients.filter(p => p.isolation === 'Airborne').length,
    droplet: occupiedPatients.filter(p => p.isolation === 'Droplet').length,
    contact: occupiedPatients.filter(p => p.isolation === 'Contact').length,
    protective: occupiedPatients.filter(p => p.isolation === 'Protective').length,
    none: occupiedPatients.filter(p => p.isolation === 'None').length,
  };

  const theme = {
    card: isDarkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-gray-200 shadow-sm',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-600',
    header: isDarkMode ? 'text-white' : 'text-gray-800',
    filterBtn: isDarkMode ? 'bg-slate-700 text-gray-300 hover:bg-slate-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    filterActive: isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white',
  };

  const mode = isDarkMode ? 'dark' : 'light';

  return (
    <div className={`rounded-2xl border-2 p-4 ${theme.card}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className={`text-xl font-bold ${theme.header}`}>Bed Isolation Overview</h2>
          <p className={`text-sm ${theme.textMuted}`}>{occupiedPatients.length} occupied, {emptyBeds.length} empty</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === 'all' ? theme.filterActive : theme.filterBtn}`}
        >
          All Beds ({occupiedPatients.length})
        </button>
        <button
          onClick={() => setFilter('airborne')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === 'airborne' ? 'bg-red-600 text-white' : theme.filterBtn}`}
        >
          Airborne ({counts.airborne})
        </button>
        <button
          onClick={() => setFilter('droplet')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === 'droplet' ? 'bg-blue-600 text-white' : theme.filterBtn}`}
        >
          Droplet ({counts.droplet})
        </button>
        <button
          onClick={() => setFilter('contact')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === 'contact' ? 'bg-yellow-600 text-white' : theme.filterBtn}`}
        >
          Contact ({counts.contact})
        </button>
        <button
          onClick={() => setFilter('protective')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === 'protective' ? 'bg-green-600 text-white' : theme.filterBtn}`}
        >
          Protective ({counts.protective})
        </button>
        <button
          onClick={() => setFilter('isolated')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === 'isolated' ? 'bg-purple-600 text-white' : theme.filterBtn}`}
        >
          All Isolated ({counts.airborne + counts.droplet + counts.contact + counts.protective})
        </button>
        <button
          onClick={() => setFilter('none')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === 'none' ? 'bg-gray-600 text-white' : theme.filterBtn}`}
        >
          No Isolation ({counts.none})
        </button>
      </div>

      {/* Beds Grid */}
      <div className="grid grid-cols-6 gap-3 mb-4">
        {filteredPatients.map((patient) => {
          const colors = ISOLATION_COLORS[patient.isolation] || ISOLATION_COLORS['None'];
          return (
            <div
              key={patient.id}
              className={`rounded-xl border-2 p-3 ${colors[mode]}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-2xl font-bold ${theme.text}`}>Bed {patient.bed}</span>
              </div>
              <div className={`text-sm font-semibold ${theme.text}`}>{patient.name}</div>
              <div className={`text-xs ${theme.textMuted}`}>{patient.mrn}</div>
              <div className={`text-xs ${theme.textMuted} mt-1`}>{patient.diagnosis}</div>
              <div className="mt-2">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${colors[mode]}`}>
                  {patient.isolation}
                </span>
              </div>
              {patient.hasDevice && (
                <div className={`text-xs ${theme.textMuted} mt-1`}>
                  Device: {patient.deviceType}
                </div>
              )}
            </div>
          );
        })}
        
        {/* Show empty beds */}
        {filter === 'all' && emptyBeds.map((bed) => (
          <div
            key={bed.id}
            className={`rounded-xl border-2 p-3 ${isDarkMode ? 'bg-slate-800/30 border-slate-700 border-dashed' : 'bg-gray-50 border-gray-300 border-dashed'} opacity-60`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-2xl font-bold ${theme.textMuted}`}>Bed {bed.bed}</span>
            </div>
            <div className={`text-sm ${theme.textMuted}`}>Empty</div>
            <div className={`text-xs ${theme.textMuted} mt-2`}>Available</div>
          </div>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className={`text-center py-8 ${theme.textMuted}`}>
          No patients matching filter
        </div>
      )}

      {/* Summary */}
      <div className={`rounded-xl p-3 ${isDarkMode ? 'bg-slate-900/50' : 'bg-gray-100'}`}>
        <div className="grid grid-cols-6 gap-4 text-center">
          <div>
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>{counts.airborne}</div>
            <div className={`text-xs ${theme.textMuted}`}>Airborne</div>
          </div>
          <div>
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{counts.droplet}</div>
            <div className={`text-xs ${theme.textMuted}`}>Droplet</div>
          </div>
          <div>
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>{counts.contact}</div>
            <div className={`text-xs ${theme.textMuted}`}>Contact</div>
          </div>
          <div>
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>{counts.protective}</div>
            <div className={`text-xs ${theme.textMuted}`}>Protective</div>
          </div>
          <div>
            <div className={`text-2xl font-bold ${theme.textMuted}`}>{counts.none}</div>
            <div className={`text-xs ${theme.textMuted}`}>No Isolation</div>
          </div>
          <div>
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{emptyBeds.length}</div>
            <div className={`text-xs ${theme.textMuted}`}>Empty Beds</div>
          </div>
        </div>
      </div>
    </div>
  );
}
