'use client';

export default function DeviceAlerts({ alerts, allPatients, isDarkMode }) {
  const deviceSummary = allPatients.filter(p => p.hasDevice).reduce((acc, p) => {
    const type = p.deviceType;
    if (!acc[type]) acc[type] = { count: 0, totalDays: 0 };
    acc[type].count++;
    acc[type].totalDays += p.deviceDays;
    return acc;
  }, {});

  const theme = {
    card: isDarkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-gray-200 shadow-sm',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-600',
    subCard: isDarkMode ? 'bg-black/20' : 'bg-gray-100',
  };

  return (
    <div className={`rounded-2xl border-2 p-4 h-full ${theme.card}`}>
      <div className="flex items-center gap-3 mb-4">
        <svg className={`w-6 h-6 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
        <h2 className={`text-xl font-bold ${theme.text}`}>Device Monitoring</h2>
      </div>

      {/* Femoral Alerts */}
      {alerts.length > 0 && (
        <div className={`mb-4 p-3 rounded-xl animate-pulse ${isDarkMode ? 'bg-red-900/30 border-2 border-red-500' : 'bg-red-100 border-2 border-red-400'}`}>
          <div className="flex items-center gap-2 mb-2">
            <svg className={`w-5 h-5 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className={`font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>FEMORAL &gt; 7 DAYS - REMOVE NOW</span>
          </div>
          <div className="space-y-1">
            {alerts.map((p) => (
              <div key={p.id} className={`flex items-center justify-between rounded-lg px-3 py-2 ${isDarkMode ? 'bg-black/30' : 'bg-white'}`}>
                <div>
                  <span className={`font-semibold ${theme.text}`}>Bed {p.bed}</span>
                  <span className={`${theme.textMuted} ml-2`}>• {p.deviceType}</span>
                </div>
                <div className="text-right">
                  <span className={`font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>{p.deviceDays} days</span>
                  <span className={`text-xs ${theme.textMuted} block`}>{p.deviceSite}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Device Summary */}
      <div className="space-y-2">
        <h3 className={`text-sm font-semibold ${theme.textMuted}`}>Device Summary</h3>
        {Object.entries(deviceSummary).map(([type, data]) => (
          <div key={type} className={`flex items-center justify-between ${theme.subCard} rounded-lg px-3 py-2`}>
            <span className={theme.text}>{type}</span>
            <div className="flex gap-4">
              <div className="text-center">
                <div className={`text-lg font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{data.count}</div>
                <div className={`text-xs ${theme.textMuted}`}>Patients</div>
              </div>
              <div className="text-center">
                <div className={`text-lg font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>{data.totalDays}</div>
                <div className={`text-xs ${theme.textMuted}`}>Total Days</div>
              </div>
            </div>
          </div>
        ))}
        {Object.keys(deviceSummary).length === 0 && (
          <div className={`text-center py-4 ${theme.textMuted}`}>No devices in use</div>
        )}
      </div>
    </div>
  );
}
