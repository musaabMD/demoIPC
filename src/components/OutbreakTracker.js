'use client';

const classColors = {
  A: { bg: 'bg-red-500/20', border: 'border-red-500', text: 'text-red-400', label: 'Critical' },
  B: { bg: 'bg-yellow-500/20', border: 'border-yellow-500', text: 'text-yellow-400', label: 'Moderate' },
  C: { bg: 'bg-green-500/20', border: 'border-green-500', text: 'text-green-400', label: 'Low' },
};

export default function OutbreakTracker({ outbreaks }) {
  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-slate-700/50 rounded-2xl p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🦠</span>
          <h2 className="text-xl font-bold text-white">Outbreak Tracker</h2>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-bold ${outbreaks.length > 0 ? 'bg-red-500/30 text-red-300' : 'bg-green-500/30 text-green-300'}`}>
          {outbreaks.length} Active
        </span>
      </div>

      {/* Class Legend */}
      <div className="flex gap-2 mb-4">
        {Object.entries(classColors).map(([cls, colors]) => (
          <div key={cls} className={`flex items-center gap-1 px-2 py-1 ${colors.bg} ${colors.border} border rounded-lg`}>
            <span className={`font-bold ${colors.text}`}>Class {cls}</span>
            <span className="text-xs text-gray-400">({colors.label})</span>
          </div>
        ))}
      </div>

      {/* Outbreaks List */}
      <div className="space-y-2">
        {outbreaks.length === 0 ? (
          <div className="text-center py-6">
            <span className="text-4xl">✅</span>
            <p className="text-green-400 mt-2">No Active Outbreaks</p>
          </div>
        ) : (
          outbreaks.map((outbreak) => {
            const colors = classColors[outbreak.class];
            return (
              <div key={outbreak.id} className={`${colors.bg} ${colors.border} border-2 rounded-xl p-3`}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`font-bold ${colors.text}`}>{outbreak.organism}</span>
                    <span className="text-gray-400 ml-2">• {outbreak.area}</span>
                  </div>
                  <span className={`px-2 py-1 ${colors.bg} ${colors.border} border rounded-full text-xs font-bold ${colors.text}`}>
                    Class {outbreak.class}
                  </span>
                </div>
                <div className="flex gap-4 mt-2 text-xs">
                  <span className="text-gray-400">Cases: <span className="text-white">{outbreak.cases}</span></span>
                  <span className="text-gray-400">Started: <span className="text-white">{outbreak.startDate}</span></span>
                  <span className={`px-2 py-0.5 rounded ${outbreak.status === 'Active' ? 'bg-red-500/30 text-red-300' : 'bg-yellow-500/30 text-yellow-300'}`}>
                    {outbreak.status}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
