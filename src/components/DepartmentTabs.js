'use client';

const tabColors = {
  icu: 'from-blue-500 to-blue-700',
  picu: 'from-pink-500 to-pink-700',
  ccu: 'from-red-500 to-red-700',
  nicu: 'from-purple-500 to-purple-700',
  hematology: 'from-orange-500 to-orange-700',
  aku: 'from-cyan-500 to-cyan-700',
  oncology: 'from-green-500 to-green-700',
  labs: 'from-indigo-500 to-indigo-700',
};

export default function DepartmentTabs({ departments, selected, onSelect, isDarkMode, showLabs, onLabsClick, isLabsActive }) {
  const theme = {
    bg: isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-gray-100 border-gray-200',
    inactive: isDarkMode ? 'bg-slate-700/50 text-gray-400 hover:bg-slate-600/50 hover:text-white' : 'bg-white text-gray-600 hover:bg-gray-200 hover:text-gray-900 border border-gray-200',
  };

  return (
    <div className={`${theme.bg} border-b px-2 md:px-6 py-2 md:py-3 overflow-x-auto`}>
      <div className="flex justify-start md:justify-center gap-1 md:gap-2 min-w-max">
        {departments.map((dept) => (
          <button
            key={dept.id}
            onClick={() => onSelect(dept)}
            className={`px-3 md:px-6 py-1.5 md:py-2 rounded-lg font-semibold text-xs md:text-sm transition-all whitespace-nowrap ${
              selected.id === dept.id && !isLabsActive
                ? `bg-gradient-to-r ${tabColors[dept.id]} text-white shadow-lg`
                : theme.inactive
            }`}
          >
            {dept.name}
          </button>
        ))}
        
        {/* Labs & Cultures Tab - positioned after Oncology */}
        {showLabs && (
          <button
            onClick={onLabsClick}
            className={`px-3 md:px-6 py-1.5 md:py-2 rounded-lg font-semibold text-xs md:text-sm transition-all flex items-center gap-1 md:gap-2 whitespace-nowrap ${
              isLabsActive
                ? `bg-gradient-to-r ${tabColors.labs} text-white shadow-lg`
                : theme.inactive
            }`}
          >
            <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <span className="hidden sm:inline">Labs & Cultures</span>
            <span className="sm:hidden">Labs</span>
          </button>
        )}
      </div>
    </div>
  );
}
