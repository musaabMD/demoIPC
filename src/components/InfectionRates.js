'use client';

export default function InfectionRates({ rates, operations }) {
  const rateCards = [
    { key: 'vae', name: 'VAE', fullName: 'Ventilator-Associated Events', icon: '🫁', color: 'purple' },
    { key: 'clabsi', name: 'CLABSI', fullName: 'Central Line-Associated BSI', icon: '🩸', color: 'red' },
    { key: 'cauti', name: 'CAUTI', fullName: 'Catheter-Associated UTI', icon: '💉', color: 'orange' },
    { key: 'ssi', name: 'SSI', fullName: 'Surgical Site Infection', icon: '🔪', color: 'yellow' },
  ];

  const colorClasses = {
    purple: { bg: 'from-purple-600/20 to-purple-800/20', border: 'border-purple-500/50', text: 'text-purple-400' },
    red: { bg: 'from-red-600/20 to-red-800/20', border: 'border-red-500/50', text: 'text-red-400' },
    orange: { bg: 'from-orange-600/20 to-orange-800/20', border: 'border-orange-500/50', text: 'text-orange-400' },
    yellow: { bg: 'from-yellow-600/20 to-yellow-800/20', border: 'border-yellow-500/50', text: 'text-yellow-400' },
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-slate-700/50 rounded-2xl p-4">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">📊</span>
        <h2 className="text-xl font-bold text-white">Infection Rates</h2>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-4">
        {rateCards.map((card) => {
          const data = rates[card.key];
          const isAboveBenchmark = parseFloat(data.rate) > data.benchmark;
          const colors = colorClasses[card.color];
          
          return (
            <div key={card.key} className={`bg-gradient-to-br ${colors.bg} ${colors.border} border-2 rounded-xl p-4`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{card.icon}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${isAboveBenchmark ? 'bg-red-500/30 text-red-300' : 'bg-green-500/30 text-green-300'}`}>
                  {isAboveBenchmark ? '↑ Above' : '✓ Below'} Benchmark
                </span>
              </div>
              <div className={`text-4xl font-bold ${colors.text}`}>{data.rate}</div>
              <div className="text-sm text-white font-semibold">{card.name}</div>
              <div className="text-xs text-gray-400">{card.fullName}</div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-black/20 rounded px-2 py-1">
                  <span className="text-gray-400">Events:</span>
                  <span className="text-white ml-1">{data.events}</span>
                </div>
                <div className="bg-black/20 rounded px-2 py-1">
                  <span className="text-gray-400">{card.key === 'ssi' ? 'Proc:' : 'Days:'}</span>
                  <span className="text-white ml-1">{card.key === 'ssi' ? data.procedures : data.deviceDays}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SSI Operations Table */}
      <div className="bg-black/20 rounded-xl p-3">
        <h3 className="text-sm font-semibold text-yellow-400 mb-2">📋 SSI by Operation Type</h3>
        <div className="grid grid-cols-5 gap-2 text-xs">
          {operations.map((op, idx) => (
            <div key={idx} className="bg-slate-800/50 rounded-lg p-2 text-center">
              <div className="text-white font-semibold">{op.type}</div>
              <div className="text-yellow-400 text-lg font-bold">{op.rate.toFixed(1)}%</div>
              <div className="text-gray-400">{op.infections}/{op.count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
