'use client';

export default function InfectionRates({ rates, operations, isDarkMode }) {
  const rateCards = [
    { key: 'vae', name: 'VAE', fullName: 'Ventilator-Associated Events', color: 'purple' },
    { key: 'clabsi', name: 'CLABSI', fullName: 'Central Line-Associated BSI', color: 'red' },
    { key: 'cauti', name: 'CAUTI', fullName: 'Catheter-Associated UTI', color: 'orange' },
    { key: 'ssi', name: 'SSI', fullName: 'Surgical Site Infection', color: 'yellow' },
  ];

  const colorClasses = {
    purple: { 
      dark: 'from-purple-600/20 to-purple-800/20 border-purple-500/50 text-purple-400',
      light: 'from-purple-50 to-purple-100 border-purple-300 text-purple-600'
    },
    red: { 
      dark: 'from-red-600/20 to-red-800/20 border-red-500/50 text-red-400',
      light: 'from-red-50 to-red-100 border-red-300 text-red-600'
    },
    orange: { 
      dark: 'from-orange-600/20 to-orange-800/20 border-orange-500/50 text-orange-400',
      light: 'from-orange-50 to-orange-100 border-orange-300 text-orange-600'
    },
    yellow: { 
      dark: 'from-yellow-600/20 to-yellow-800/20 border-yellow-500/50 text-yellow-400',
      light: 'from-yellow-50 to-yellow-100 border-yellow-300 text-yellow-600'
    },
  };

  const theme = {
    card: isDarkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-gray-200 shadow-sm',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-600',
    subCard: isDarkMode ? 'bg-black/20' : 'bg-gray-100',
    ssiCard: isDarkMode ? 'bg-slate-800/50' : 'bg-gray-50 border border-gray-200',
  };

  const mode = isDarkMode ? 'dark' : 'light';

  return (
    <div className={`rounded-2xl border-2 p-4 ${theme.card}`}>
      <div className="flex items-center gap-3 mb-4">
        <svg className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <h2 className={`text-xl font-bold ${theme.text}`}>Infection Rates</h2>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-4">
        {rateCards.map((card) => {
          const data = rates[card.key];
          const isAboveBenchmark = parseFloat(data.rate) > data.benchmark;
          const colors = colorClasses[card.color][mode];
          
          return (
            <div key={card.key} className={`bg-gradient-to-br ${colors} border-2 rounded-xl p-4`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  isAboveBenchmark 
                    ? (isDarkMode ? 'bg-red-500/30 text-red-300' : 'bg-red-100 text-red-600')
                    : (isDarkMode ? 'bg-green-500/30 text-green-300' : 'bg-green-100 text-green-600')
                }`}>
                  {isAboveBenchmark ? 'Above' : 'Below'} Benchmark
                </span>
              </div>
              <div className={`text-4xl font-bold`}>{data.rate}</div>
              <div className={`text-sm font-semibold ${theme.text}`}>{card.name}</div>
              <div className={`text-xs ${theme.textMuted}`}>{card.fullName}</div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <div className={`${theme.subCard} rounded px-2 py-1`}>
                  <span className={theme.textMuted}>Events:</span>
                  <span className={`${theme.text} ml-1`}>{data.events}</span>
                </div>
                <div className={`${theme.subCard} rounded px-2 py-1`}>
                  <span className={theme.textMuted}>{card.key === 'ssi' ? 'Proc:' : 'Days:'}</span>
                  <span className={`${theme.text} ml-1`}>{card.key === 'ssi' ? data.procedures : data.deviceDays}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SSI Operations Table */}
      <div className={`${theme.subCard} rounded-xl p-3`}>
        <h3 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>SSI by Operation Type</h3>
        <div className="grid grid-cols-5 gap-2 text-xs">
          {operations.map((op, idx) => (
            <div key={idx} className={`${theme.ssiCard} rounded-lg p-2 text-center`}>
              <div className={`${theme.text} font-semibold`}>{op.type}</div>
              <div className={`${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'} text-lg font-bold`}>{op.rate.toFixed(1)}%</div>
              <div className={theme.textMuted}>{op.infections}/{op.count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
