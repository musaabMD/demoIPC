'use client';

export default function ScreeningStatus({ screeningNotDone, cultureNotDone, bundleNotApplied, isDarkMode }) {
  const theme = {
    card: isDarkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-gray-200 shadow-sm',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-600',
    badge: isDarkMode ? 'bg-black/30 text-gray-300' : 'bg-gray-200 text-gray-700',
  };

  const items = [
    { 
      label: 'Screening Not Done', 
      count: screeningNotDone.length, 
      patients: screeningNotDone,
      colors: screeningNotDone.length > 0 
        ? (isDarkMode ? 'bg-red-900/20 border-red-500/50' : 'bg-red-50 border-red-300')
        : (isDarkMode ? 'bg-green-900/20 border-green-500/50' : 'bg-green-50 border-green-300'),
      textColor: screeningNotDone.length > 0 
        ? (isDarkMode ? 'text-red-400' : 'text-red-600')
        : (isDarkMode ? 'text-green-400' : 'text-green-600')
    },
    { 
      label: 'Culture Not Done', 
      count: cultureNotDone.length, 
      patients: cultureNotDone,
      colors: cultureNotDone.length > 0 
        ? (isDarkMode ? 'bg-orange-900/20 border-orange-500/50' : 'bg-orange-50 border-orange-300')
        : (isDarkMode ? 'bg-green-900/20 border-green-500/50' : 'bg-green-50 border-green-300'),
      textColor: cultureNotDone.length > 0 
        ? (isDarkMode ? 'text-orange-400' : 'text-orange-600')
        : (isDarkMode ? 'text-green-400' : 'text-green-600')
    },
    { 
      label: 'Bundle Not Applied', 
      count: bundleNotApplied.length, 
      patients: bundleNotApplied,
      colors: bundleNotApplied.length > 0 
        ? (isDarkMode ? 'bg-yellow-900/20 border-yellow-500/50' : 'bg-yellow-50 border-yellow-300')
        : (isDarkMode ? 'bg-green-900/20 border-green-500/50' : 'bg-green-50 border-green-300'),
      textColor: bundleNotApplied.length > 0 
        ? (isDarkMode ? 'text-yellow-400' : 'text-yellow-600')
        : (isDarkMode ? 'text-green-400' : 'text-green-600')
    },
  ];

  return (
    <div className={`rounded-2xl border-2 p-4 h-full ${theme.card}`}>
      <div className="flex items-center gap-3 mb-4">
        <svg className={`w-6 h-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        <h2 className={`text-xl font-bold ${theme.text}`}>Compliance Status</h2>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.label} className={`rounded-xl p-3 border-2 ${item.colors}`}>
            <div className="flex items-center justify-between">
              <span className={`font-semibold ${theme.text}`}>{item.label}</span>
              <span className={`text-2xl font-bold ${item.textColor}`}>{item.count}</span>
            </div>
            {item.patients.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {item.patients.slice(0, 5).map((p) => (
                  <span key={p.id} className={`px-2 py-1 rounded text-xs ${theme.badge}`}>
                    Bed {p.bed}
                  </span>
                ))}
                {item.patients.length > 5 && (
                  <span className={`px-2 py-1 rounded text-xs ${theme.textMuted}`}>
                    +{item.patients.length - 5} more
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
