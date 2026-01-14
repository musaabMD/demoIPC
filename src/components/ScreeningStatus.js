'use client';

export default function ScreeningStatus({ screeningNotDone, cultureNotDone, bundleNotApplied }) {
  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-slate-700/50 rounded-2xl p-4 h-full">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">🔬</span>
        <h2 className="text-xl font-bold text-white">Compliance Status</h2>
      </div>

      <div className="space-y-3">
        {/* Screening Not Done */}
        <div className={`rounded-xl p-3 border-2 ${screeningNotDone.length > 0 ? 'bg-red-900/20 border-red-500/50' : 'bg-green-900/20 border-green-500/50'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🧪</span>
              <span className="text-white font-semibold">Screening Not Done</span>
            </div>
            <span className={`text-2xl font-bold ${screeningNotDone.length > 0 ? 'text-red-400' : 'text-green-400'}`}>
              {screeningNotDone.length}
            </span>
          </div>
          {screeningNotDone.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {screeningNotDone.slice(0, 5).map((p) => (
                <span key={p.id} className="px-2 py-1 bg-black/30 rounded text-xs text-gray-300">
                  Bed {p.bed}
                </span>
              ))}
              {screeningNotDone.length > 5 && (
                <span className="px-2 py-1 bg-black/30 rounded text-xs text-gray-400">
                  +{screeningNotDone.length - 5} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Culture Not Done */}
        <div className={`rounded-xl p-3 border-2 ${cultureNotDone.length > 0 ? 'bg-orange-900/20 border-orange-500/50' : 'bg-green-900/20 border-green-500/50'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🧫</span>
              <span className="text-white font-semibold">Culture Not Done</span>
            </div>
            <span className={`text-2xl font-bold ${cultureNotDone.length > 0 ? 'text-orange-400' : 'text-green-400'}`}>
              {cultureNotDone.length}
            </span>
          </div>
          {cultureNotDone.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {cultureNotDone.slice(0, 5).map((p) => (
                <span key={p.id} className="px-2 py-1 bg-black/30 rounded text-xs text-gray-300">
                  Bed {p.bed}
                </span>
              ))}
              {cultureNotDone.length > 5 && (
                <span className="px-2 py-1 bg-black/30 rounded text-xs text-gray-400">
                  +{cultureNotDone.length - 5} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Bundle Not Applied */}
        <div className={`rounded-xl p-3 border-2 ${bundleNotApplied.length > 0 ? 'bg-yellow-900/20 border-yellow-500/50' : 'bg-green-900/20 border-green-500/50'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">📦</span>
              <span className="text-white font-semibold">Bundle Not Applied</span>
            </div>
            <span className={`text-2xl font-bold ${bundleNotApplied.length > 0 ? 'text-yellow-400' : 'text-green-400'}`}>
              {bundleNotApplied.length}
            </span>
          </div>
          {bundleNotApplied.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {bundleNotApplied.slice(0, 5).map((p) => (
                <span key={p.id} className="px-2 py-1 bg-black/30 rounded text-xs text-gray-300">
                  Bed {p.bed}
                </span>
              ))}
              {bundleNotApplied.length > 5 && (
                <span className="px-2 py-1 bg-black/30 rounded text-xs text-gray-400">
                  +{bundleNotApplied.length - 5} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
