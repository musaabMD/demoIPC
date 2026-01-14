'use client';

export default function ScoreCards({ ipccScore, bicslScore, handHygiene, cleaning, isDarkMode }) {
  const theme = {
    card: isDarkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-gray-200 shadow-sm',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-600',
  };

  const getScoreColor = (score) => {
    if (score >= 90) return isDarkMode ? 'text-green-400' : 'text-green-600';
    if (score >= 75) return isDarkMode ? 'text-yellow-400' : 'text-yellow-600';
    return isDarkMode ? 'text-red-400' : 'text-red-600';
  };

  const ScoreItem = ({ label, score, icon }) => (
    <div className={`${isDarkMode ? 'bg-slate-900/50' : 'bg-gray-100'} rounded-xl p-2 md:p-3`}>
      <div className="flex items-center gap-2 mb-1 md:mb-2">
        {icon}
        <span className={`text-xs md:text-sm ${theme.textMuted}`}>{label}</span>
      </div>
      <div className={`text-2xl md:text-3xl font-bold ${getScoreColor(score)}`}>{score}%</div>
      <div className={`w-full ${isDarkMode ? 'bg-slate-700' : 'bg-gray-300'} rounded-full h-1.5 md:h-2 mt-1 md:mt-2`}>
        <div 
          className={`h-1.5 md:h-2 rounded-full ${
            score >= 90 ? 'bg-green-500' : score >= 75 ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className={`rounded-2xl border-2 p-3 md:p-4 h-full ${theme.card}`}>
      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
        <svg className={`w-5 h-5 md:w-6 md:h-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className={`text-lg md:text-xl font-bold ${theme.text}`}>Compliance</h2>
      </div>

      <div className="grid grid-cols-2 gap-2 md:gap-3">
        <ScoreItem 
          label="IPCC Score" 
          score={ipccScore}
          icon={<svg className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
        />
        <ScoreItem 
          label="BICSL Score" 
          score={bicslScore}
          icon={<svg className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>}
        />
        <ScoreItem 
          label="Hand Hygiene" 
          score={handHygiene}
          icon={<svg className={`w-4 h-4 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" /></svg>}
        />
        <ScoreItem 
          label="Terminal Clean" 
          score={cleaning}
          icon={<svg className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>}
        />
      </div>
    </div>
  );
}
