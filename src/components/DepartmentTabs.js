'use client';

const tabColors = {
  icu: 'from-blue-500 to-blue-700',
  picu: 'from-pink-500 to-pink-700',
  ccu: 'from-red-500 to-red-700',
  nicu: 'from-purple-500 to-purple-700',
  hematology: 'from-orange-500 to-orange-700',
  aku: 'from-cyan-500 to-cyan-700',
  oncology: 'from-green-500 to-green-700',
};

export default function DepartmentTabs({ departments, selected, onSelect }) {
  return (
    <div className="bg-slate-800/50 border-b border-slate-700 px-6 py-3">
      <div className="flex gap-2">
        {departments.map((dept) => (
          <button
            key={dept.id}
            onClick={() => onSelect(dept)}
            className={`px-6 py-3 rounded-xl font-semibold text-lg transition-all ${
              selected.id === dept.id
                ? `bg-gradient-to-r ${tabColors[dept.id]} text-white shadow-lg scale-105`
                : 'bg-slate-700/50 text-gray-400 hover:bg-slate-600/50 hover:text-white'
            }`}
          >
            {dept.name}
          </button>
        ))}
      </div>
    </div>
  );
}
