'use client';

export default function DeviceAlerts({ alerts, allPatients, isDarkMode }) {
  const theme = {
    card: isDarkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-gray-200 shadow-sm',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-600',
  };

  const devicePatients = allPatients.filter(p => p.hasDevice);
  const deviceCounts = devicePatients.reduce((acc, p) => {
    acc[p.deviceType] = (acc[p.deviceType] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className={`rounded-2xl border-2 p-3 md:p-4 h-full ${theme.card}`}>
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <div className="flex items-center gap-2 md:gap-3">
          <svg className={`w-5 h-5 md:w-6 md:h-6 ${alerts.length > 0 ? (isDarkMode ? 'text-red-400' : 'text-red-600') : (isDarkMode ? 'text-green-400' : 'text-green-600')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <h2 className={`text-lg md:text-xl font-bold ${theme.text}`}>Device Alerts</h2>
        </div>
      </div>

      {/* Femoral Alerts */}
      {alerts.length > 0 ? (
        <div className={`${isDarkMode ? 'bg-red-900/30 border-red-500' : 'bg-red-100 border-red-300'} border-2 rounded-xl p-2 md:p-3 mb-3 md:mb-4 animate-pulse`}>
          <div className={`font-bold text-sm ${isDarkMode ? 'text-red-400' : 'text-red-600'} mb-1 md:mb-2`}>
            Femoral Line {'>'} 7 Days
          </div>
          <div className="space-y-1">
            {alerts.map((alert) => (
              <div key={alert.id} className={`text-xs md:text-sm ${theme.text}`}>
                Bed {alert.bed}: {alert.name} - {alert.deviceDays} days
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={`${isDarkMode ? 'bg-green-900/20' : 'bg-green-50'} rounded-xl p-2 md:p-3 mb-3 md:mb-4`}>
          <p className={`text-xs md:text-sm ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            No Femoral Line Alerts
          </p>
        </div>
      )}

      {/* Device Summary */}
      <div className={`${isDarkMode ? 'bg-slate-900/50' : 'bg-gray-100'} rounded-xl p-2 md:p-3`}>
        <div className={`font-semibold text-xs md:text-sm ${theme.text} mb-2`}>Device Summary</div>
        <div className="grid grid-cols-2 gap-1 md:gap-2">
          {Object.entries(deviceCounts).map(([device, count]) => (
            <div key={device} className={`text-xs ${theme.textMuted} flex justify-between`}>
              <span className="truncate">{device}</span>
              <span className={`font-bold ${theme.text} ml-1`}>{count}</span>
            </div>
          ))}
        </div>
        <div className={`mt-2 pt-2 border-t ${isDarkMode ? 'border-slate-700' : 'border-gray-300'} flex justify-between text-xs md:text-sm`}>
          <span className={theme.textMuted}>Total on Devices</span>
          <span className={`font-bold ${theme.text}`}>{devicePatients.length}</span>
        </div>
      </div>
    </div>
  );
}
