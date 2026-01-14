'use client';

export default function ScoreCards({ ipccScore, bicslScore, handHygiene, cleaning }) {
  const getScoreColor = (score) => {
    if (score >= 90) return { bg: 'from-green-600/30 to-green-800/30', border: 'border-green-500', text: 'text-green-400' };
    if (score >= 75) return { bg: 'from-yellow-600/30 to-yellow-800/30', border: 'border-yellow-500', text: 'text-yellow-400' };
    return { bg: 'from-red-600/30 to-red-800/30', border: 'border-red-500', text: 'text-red-400' };
  };

  const scores = [
    { name: 'IPCC Score', value: ipccScore, icon: '📋', description: 'Infection Prevention & Control' },
    { name: 'BICSL Score', value: bicslScore, icon: '🏆', description: 'Bundle Implementation Compliance' },
    { name: 'Hand Hygiene', value: handHygiene, icon: '🧼', description: 'Compliance Rate' },
    { name: 'Terminal Cleaning', value: cleaning, icon: '🧹', description: 'Environmental Compliance' },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-slate-700/50 rounded-2xl p-4 h-full">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">📈</span>
        <h2 className="text-xl font-bold text-white">Quality Scores</h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {scores.map((score) => {
          const colors = getScoreColor(score.value);
          return (
            <div key={score.name} className={`bg-gradient-to-br ${colors.bg} ${colors.border} border-2 rounded-xl p-3 text-center`}>
              <span className="text-2xl">{score.icon}</span>
              <div className={`text-3xl font-bold ${colors.text} mt-1`}>{score.value}%</div>
              <div className="text-sm text-white font-semibold">{score.name}</div>
              <div className="text-xs text-gray-400">{score.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
