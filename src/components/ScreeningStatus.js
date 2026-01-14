'use client';

export default function ScreeningStatus({ screeningNotDone, cultureNotDone, bundleNotApplied, isDarkMode }) {
  const theme = {
    card: isDarkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-gray-200 shadow-sm',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-600',
    alert: isDarkMode ? 'bg-red-500/20 border-red-500/50' : 'bg-red-50 border-red-200',
    warning: isDarkMode ? 'bg-yellow-500/20 border-yellow-500/50' : 'bg-yellow-50 border-yellow-200',
    success: isDarkMode ? 'bg-green-500/20 border-green-500/50' : 'bg-green-50 border-green-200',
  };

  const StatusSection = ({ title, count, items, type }) => {
    const bgColor = count > 0 
      ? (type === 'alert' ? theme.alert : theme.warning)
      : theme.success;
    
    return (
      <div className={`${bgColor} border rounded-xl p-2 md:p-3`}>
        <div className="flex items-center justify-between mb-1 md:mb-2">
          <span className={`font-semibold text-xs md:text-sm ${theme.text}`}>{title}</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
            count > 0 
              ? (isDarkMode ? 'bg-red-500/30 text-red-300' : 'bg-red-100 text-red-600')
              : (isDarkMode ? 'bg-green-500/30 text-green-300' : 'bg-green-100 text-green-600')
          }`}>
            {count}
          </span>
        </div>
        {count > 0 && items.length > 0 && (
          <div className="space-y-1 max-h-20 overflow-y-auto">
            {items.slice(0, 3).map((patient) => (
              <div key={patient.id} className={`text-xs ${theme.textMuted} truncate`}>
                Bed {patient.bed}: {patient.name}
              </div>
            ))}
            {items.length > 3 && (
              <div className={`text-xs ${theme.textMuted}`}>+{items.length - 3} more</div>
            )}
          </div>
        )}
        {count === 0 && (
          <div className={`text-xs ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>All Complete</div>
        )}
      </div>
    );
  };

  return (
    <div className={`rounded-2xl border-2 p-3 md:p-4 h-full ${theme.card}`}>
      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
        <svg className={`w-5 h-5 md:w-6 md:h-6 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        <h2 className={`text-lg md:text-xl font-bold ${theme.text}`}>Pending Tasks</h2>
      </div>

      <div className="space-y-2 md:space-y-3">
        <StatusSection 
          title="Screening Not Done" 
          count={screeningNotDone.length} 
          items={screeningNotDone}
          type="warning"
        />
        <StatusSection 
          title="Culture Not Done" 
          count={cultureNotDone.length} 
          items={cultureNotDone}
          type="warning"
        />
        <StatusSection 
          title="Bundle Not Applied" 
          count={bundleNotApplied.length} 
          items={bundleNotApplied}
          type="alert"
        />
      </div>
    </div>
  );
}
