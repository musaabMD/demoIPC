'use client';

export default function DeviceAlerts({ alerts, allPatients }) {
  const deviceSummary = allPatients.filter(p => p.hasDevice).reduce((acc, p) => {
    const type = p.deviceType;
    if (!acc[type]) acc[type] = { count: 0, totalDays: 0 };
    acc[type].count++;
    acc[type].totalDays += p.deviceDays;
    return acc;
  }, {});

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-slate-700/50 rounded-2xl p-4 h-full">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">🔌</span>
        <h2 className="text-xl font-bold text-white">Device Monitoring</h2>
      </div>

      {/* Femoral Alerts */}
      {alerts.length > 0 && (
        <div className="mb-4 p-3 bg-red-900/30 border-2 border-red-500 rounded-xl animate-pulse">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🚨</span>
            <span className="text-red-400 font-bold">FEMORAL &gt; 7 DAYS - REMOVE NOW!</span>
          </div>
          <div className="space-y-1">
            {alerts.map((p) => (
              <div key={p.id} className="flex items-center justify-between bg-black/30 rounded-lg px-3 py-2">
                <div>
                  <span className="text-white font-semibold">Bed {p.bed}</span>
                  <span className="text-gray-400 ml-2">• {p.deviceType}</span>
                </div>
                <div className="text-right">
                  <span className="text-red-400 font-bold">{p.deviceDays} days</span>
                  <span className="text-xs text-gray-400 block">{p.deviceSite}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Device Summary */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-400">Device Summary</h3>
        {Object.entries(deviceSummary).map(([type, data]) => (
          <div key={type} className="flex items-center justify-between bg-black/20 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {type === 'Ventilator' ? '🫁' : type === 'Central Line' ? '💉' : type === 'Foley Catheter' ? '🩺' : '📍'}
              </span>
              <span className="text-white">{type}</span>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400">{data.count}</div>
                <div className="text-xs text-gray-400">Patients</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-400">{data.totalDays}</div>
                <div className="text-xs text-gray-400">Total Days</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
