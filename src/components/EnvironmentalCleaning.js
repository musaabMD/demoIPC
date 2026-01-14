'use client';

export default function EnvironmentalCleaning({ compliance }) {
  return (
    <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border-2 border-green-500/50 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">🧹</span>
        <span className="text-white font-semibold">Terminal Cleaning</span>
      </div>
      <div className="text-4xl font-bold text-green-400">{compliance}%</div>
      <div className="text-sm text-gray-400">ICU Isolation Compliance</div>
      <div className="mt-2 bg-slate-700 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-full transition-all ${compliance >= 90 ? 'bg-green-500' : compliance >= 75 ? 'bg-yellow-500' : 'bg-red-500'}`}
          style={{ width: `${compliance}%` }}
        />
      </div>
    </div>
  );
}
