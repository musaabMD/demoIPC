'use client';

export default function ScoreCards({ ipccScore, bicslScore, handHygiene, cleaning, isDarkMode }) {
  const getScoreColor = (score) => {
    if (score >= 90) return { 
      dark: 'from-green-600/30 to-green-800/30 border-green-500 text-green-400',
      light: 'from-green-50 to-green-100 border-green-400 text-green-600'
    };
    if (score >= 75) return { 
      dark: 'from-yellow-600/30 to-yellow-800/30 border-yellow-500 text-yellow-400',
      light: 'from-yellow-50 to-yellow-100 border-yellow-400 text-yellow-600'
    };
    return { 
      dark: 'from-red-600/30 to-red-800/30 border-red-500 text-red-400',
      light: 'from-red-50 to-red-100 border-red-400 text-red-600'
    };
  };

  const theme = {
    card: isDarkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-gray-200 shadow-sm',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-600',
  };
  const mode = isDarkMode ? 'dark' : 'light';

  const scores = [
    { name: 'IPCC Score', value: ipccScore, description: 'Infection Prevention & Control' },
    { name: 'BICSL Score', value: bicslScore, description: 'Bundle Implementation Compliance' },
    { name: 'Hand Hygiene', value: handHygiene, description: 'Compliance Rate' },
    { name: 'Terminal Cleaning', value: cleaning, description: 'Environmental Compliance' },
  ];

  return (
    <div className={`rounded-2xl border-2 p-4 h-full ${theme.card}`}>
      <div className="flex items-center gap-3 mb-4">
        <svg className={`w-6 h-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className={`text-xl font-bold ${theme.text}`}>Quality Scores</h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {scores.map((score) => {
          const colors = getScoreColor(score.value)[mode];
          return (
            <div key={score.name} className={`bg-gradient-to-br ${colors} border-2 rounded-xl p-3 text-center`}>
              <div className={`text-3xl font-bold`}>{score.value}%</div>
              <div className={`text-sm font-semibold ${theme.text}`}>{score.name}</div>
              <div className={`text-xs ${theme.textMuted}`}>{score.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
