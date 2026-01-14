'use client';

import { useState } from 'react';

export default function PatientTable({ patients, department, isDarkMode }) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('bed');

  const theme = {
    card: isDarkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-gray-200 shadow-sm',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-600',
    header: isDarkMode ? 'bg-slate-800' : 'bg-gray-100',
    row: isDarkMode ? 'border-slate-700 hover:bg-slate-700/50' : 'border-gray-200 hover:bg-gray-50',
    select: isDarkMode ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-900 border-gray-300',
  };

  const filteredPatients = patients.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'device') return p.hasDevice;
    if (filter === 'noDevice') return !p.hasDevice;
    return true;
  });

  const sortedPatients = [...filteredPatients].sort((a, b) => {
    if (sortBy === 'bed') return a.bed - b.bed;
    if (sortBy === 'patientDays') return b.patientDays - a.patientDays;
    if (sortBy === 'deviceDays') return (b.deviceDays || 0) - (a.deviceDays || 0);
    return 0;
  });

  const isolationColors = {
    'Airborne': isDarkMode ? 'bg-red-500/30 text-red-300' : 'bg-red-100 text-red-700',
    'Droplet': isDarkMode ? 'bg-blue-500/30 text-blue-300' : 'bg-blue-100 text-blue-700',
    'Contact': isDarkMode ? 'bg-yellow-500/30 text-yellow-300' : 'bg-yellow-100 text-yellow-700',
    'None': isDarkMode ? 'bg-slate-600/50 text-gray-400' : 'bg-gray-100 text-gray-500',
  };

  return (
    <div className={`rounded-2xl border-2 p-3 md:p-4 ${theme.card}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3 md:mb-4">
        <div className="flex items-center gap-2 md:gap-3">
          <svg className={`w-5 h-5 md:w-6 md:h-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className={`text-lg md:text-xl font-bold ${theme.text}`}>Patient Details - {department.name}</h2>
        </div>
        <div className="flex gap-2">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={`${theme.select} px-2 md:px-3 py-1 md:py-1.5 rounded-lg border text-xs md:text-sm`}
          >
            <option value="all">All Patients</option>
            <option value="device">With Device</option>
            <option value="noDevice">Without Device</option>
          </select>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`${theme.select} px-2 md:px-3 py-1 md:py-1.5 rounded-lg border text-xs md:text-sm`}
          >
            <option value="bed">Sort by Bed</option>
            <option value="patientDays">Sort by Patient Days</option>
            <option value="deviceDays">Sort by Device Days</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto -mx-3 md:mx-0">
        <table className="w-full text-xs md:text-sm min-w-[900px]">
          <thead>
            <tr className={theme.header}>
              <th className={`px-2 md:px-3 py-2 text-left ${theme.textMuted}`}>Bed</th>
              <th className={`px-2 md:px-3 py-2 text-left ${theme.textMuted}`}>Patient</th>
              <th className={`px-2 md:px-3 py-2 text-left ${theme.textMuted} hidden sm:table-cell`}>MRN</th>
              <th className={`px-2 md:px-3 py-2 text-left ${theme.textMuted}`}>Diagnosis</th>
              <th className={`px-2 md:px-3 py-2 text-left ${theme.textMuted}`}>Isolation</th>
              <th className={`px-2 md:px-3 py-2 text-left ${theme.textMuted} hidden lg:table-cell`}>Screening</th>
              <th className={`px-2 md:px-3 py-2 text-left ${theme.textMuted} hidden lg:table-cell`}>Culture</th>
              <th className={`px-2 md:px-3 py-2 text-left ${theme.textMuted} hidden md:table-cell`}>Bundle</th>
              <th className={`px-2 md:px-3 py-2 text-left ${theme.textMuted}`}>Device</th>
              <th className={`px-2 md:px-3 py-2 text-left ${theme.textMuted} hidden md:table-cell`}>Site</th>
              <th className={`px-2 md:px-3 py-2 text-left ${theme.textMuted}`}>Days</th>
              <th className={`px-2 md:px-3 py-2 text-left ${theme.textMuted}`}>Risks</th>
            </tr>
          </thead>
          <tbody>
            {sortedPatients.map((patient) => (
              <tr 
                key={patient.id} 
                className={`border-b ${theme.row} ${patient.femoralAlarm ? (isDarkMode ? 'bg-red-900/30' : 'bg-red-50') : ''}`}
              >
                <td className={`px-2 md:px-3 py-2 font-bold ${theme.text}`}>{patient.bed}</td>
                <td className="px-2 md:px-3 py-2">
                  <div className={`font-semibold ${theme.text}`}>{patient.name}</div>
                  <div className={`text-xs ${theme.textMuted}`}>{patient.age} {patient.ageUnit}, {patient.gender}</div>
                </td>
                <td className={`px-2 md:px-3 py-2 text-xs ${theme.textMuted} hidden sm:table-cell`}>{patient.mrn}</td>
                <td className={`px-2 md:px-3 py-2 ${theme.text}`}>{patient.diagnosis}</td>
                <td className="px-2 md:px-3 py-2">
                  <span className={`px-1.5 md:px-2 py-0.5 md:py-1 rounded text-xs font-semibold ${isolationColors[patient.isolation]}`}>
                    {patient.isolation}
                  </span>
                </td>
                <td className="px-2 md:px-3 py-2 hidden lg:table-cell">
                  <span className={`px-1.5 py-0.5 rounded text-xs ${
                    patient.screeningDone 
                      ? (isDarkMode ? 'bg-green-600/30 text-green-300' : 'bg-green-100 text-green-700')
                      : (isDarkMode ? 'bg-red-600/30 text-red-300' : 'bg-red-100 text-red-700')
                  }`}>
                    {patient.screeningDone ? 'Done' : 'Pending'}
                  </span>
                </td>
                <td className="px-2 md:px-3 py-2 hidden lg:table-cell">
                  <span className={`px-1.5 py-0.5 rounded text-xs ${
                    patient.cultureDone 
                      ? (isDarkMode ? 'bg-green-600/30 text-green-300' : 'bg-green-100 text-green-700')
                      : (isDarkMode ? 'bg-red-600/30 text-red-300' : 'bg-red-100 text-red-700')
                  }`}>
                    {patient.cultureDone ? 'Done' : 'Pending'}
                  </span>
                </td>
                <td className="px-2 md:px-3 py-2 hidden md:table-cell">
                  <span className={`px-1.5 py-0.5 rounded text-xs ${
                    patient.bundleApplied 
                      ? (isDarkMode ? 'bg-green-600/30 text-green-300' : 'bg-green-100 text-green-700')
                      : (isDarkMode ? 'bg-red-600/30 text-red-300' : 'bg-red-100 text-red-700')
                  }`}>
                    {patient.bundleApplied ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className={`px-2 md:px-3 py-2 ${patient.hasDevice ? theme.text : theme.textMuted}`}>
                  {patient.deviceType || '-'}
                </td>
                <td className={`px-2 md:px-3 py-2 ${theme.textMuted} hidden md:table-cell`}>
                  {patient.deviceSite || '-'}
                </td>
                <td className="px-2 md:px-3 py-2">
                  <div className={theme.text}>{patient.patientDays}d</div>
                  {patient.hasDevice && (
                    <div className={`text-xs ${patient.femoralAlarm ? (isDarkMode ? 'text-red-400' : 'text-red-600') : theme.textMuted}`}>
                      Dev: {patient.deviceDays}d
                    </div>
                  )}
                </td>
                <td className="px-2 md:px-3 py-2">
                  <div className="flex flex-wrap gap-0.5">
                    {patient.clabsiRisk && <span className={`px-1 py-0.5 text-xs rounded ${isDarkMode ? 'bg-blue-600/30 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>CL</span>}
                    {patient.cautiRisk && <span className={`px-1 py-0.5 text-xs rounded ${isDarkMode ? 'bg-yellow-600/30 text-yellow-300' : 'bg-yellow-100 text-yellow-700'}`}>CA</span>}
                    {patient.vapRisk && <span className={`px-1 py-0.5 text-xs rounded ${isDarkMode ? 'bg-red-600/30 text-red-300' : 'bg-red-100 text-red-700'}`}>VA</span>}
                    {patient.femoralAlarm && <span className={`px-1 py-0.5 text-xs rounded animate-pulse ${isDarkMode ? 'bg-red-600 text-white' : 'bg-red-500 text-white'}`}>FEM</span>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
