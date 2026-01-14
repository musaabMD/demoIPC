'use client';

export default function HandHygiene({ compliance }) {
  return (
    <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-800/20 border-2 border-cyan-500/50 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">🧼</span>
        <span className="text-white font-semibold">Hand Hygiene Compliance</span>
      </div>
      <div className="text-4xl font-bold text-cyan-400">{compliance}%</div>
      <div className="mt-2 bg-slate-700 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-full transition-all ${compliance >= 90 ? 'bg-green-500' : compliance >= 75 ? 'bg-yellow-500' : 'bg-red-500'}`}
          style={{ width: `${compliance}%` }}
        />
      </div>
    </div>
  );
}
