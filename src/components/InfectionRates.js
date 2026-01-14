'use client';

export default function InfectionRates({ rates, operations, isDarkMode }) {
  const theme = {
    card: isDarkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-gray-200 shadow-sm',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-600',
    positive: isDarkMode ? 'text-red-400' : 'text-red-600',
    success: isDarkMode ? 'text-green-400' : 'text-green-600',
    rateCard: isDarkMode ? 'bg-slate-900/50' : 'bg-gray-100',
  };

  const RateCard = ({ label, rate, benchmark, events, days, type }) => {
    const isAboveBenchmark = parseFloat(rate) > benchmark;
    return (
      <div className={`${theme.rateCard} rounded-xl p-2 md:p-3`}>
        <div className="flex items-center justify-between mb-1 md:mb-2">
          <span className={`font-semibold text-sm md:text-base ${theme.text}`}>{label}</span>
          <span className={`text-xs ${theme.textMuted}`}>Benchmark: {benchmark}</span>
        </div>
        <div className={`text-2xl md:text-3xl font-bold ${isAboveBenchmark ? theme.positive : theme.success}`}>
          {rate}
          <span className="text-xs md:text-sm font-normal ml-1">per 1000 {type}</span>
        </div>
        <div className={`text-xs ${theme.textMuted} mt-1`}>
          {events} events / {days} {type}
        </div>
      </div>
    );
  };

  return (
    <div className={`rounded-2xl border-2 p-3 md:p-4 h-full ${theme.card}`}>
      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
        <svg className={`w-5 h-5 md:w-6 md:h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <h2 className={`text-lg md:text-xl font-bold ${theme.text}`}>Infection Rates</h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 mb-3 md:mb-4">
        <RateCard label="VAE" rate={rates.vae.rate} benchmark={rates.vae.benchmark} events={rates.vae.events} days={rates.vae.deviceDays} type="vent days" />
        <RateCard label="CLABSI" rate={rates.clabsi.rate} benchmark={rates.clabsi.benchmark} events={rates.clabsi.events} days={rates.clabsi.deviceDays} type="line days" />
        <RateCard label="CAUTI" rate={rates.cauti.rate} benchmark={rates.cauti.benchmark} events={rates.cauti.events} days={rates.cauti.deviceDays} type="cath days" />
        <RateCard label="SSI" rate={rates.ssi.rate} benchmark={rates.ssi.benchmark} events={rates.ssi.events} days={rates.ssi.procedures} type="procedures" />
      </div>

      {/* SSI by Operation Type */}
      <div className={`${theme.rateCard} rounded-xl p-2 md:p-3`}>
        <h3 className={`font-semibold text-sm md:text-base ${theme.text} mb-2`}>SSI by Operation Type</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {operations.map((op) => (
            <div key={op.type} className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-lg p-2`}>
              <div className={`text-xs ${theme.textMuted} truncate`}>{op.type}</div>
              <div className={`text-lg md:text-xl font-bold ${op.infections > 0 ? theme.positive : theme.success}`}>
                {op.rate.toFixed(1)}%
              </div>
              <div className={`text-xs ${theme.textMuted}`}>{op.infections}/{op.count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
