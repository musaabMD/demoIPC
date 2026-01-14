'use client';

import { useState } from 'react';

const isolationColors = {
  None: { dark: 'bg-slate-700 text-gray-300', light: 'bg-gray-200 text-gray-700' },
  Contact: { dark: 'bg-yellow-500/30 text-yellow-300 border border-yellow-500', light: 'bg-yellow-100 text-yellow-700 border border-yellow-400' },
  Droplet: { dark: 'bg-blue-500/30 text-blue-300 border border-blue-500', light: 'bg-blue-100 text-blue-700 border border-blue-400' },
  Airborne: { dark: 'bg-red-500/30 text-red-300 border border-red-500', light: 'bg-red-100 text-red-700 border border-red-400' },
  Protective: { dark: 'bg-green-500/30 text-green-300 border border-green-500', light: 'bg-green-100 text-green-700 border border-green-400' },
};

export default function PatientTable({ patients, department, isDarkMode }) {
  const [sortBy, setSortBy] = useState('bed');
  const [filterDevice, setFilterDevice] = useState('all');

  const theme = {
    card: isDarkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-gray-200 shadow-sm',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-600',
    header: isDarkMode ? 'bg-slate-800' : 'bg-gray-100',
    row: isDarkMode ? 'border-slate-700 hover:bg-slate-700/50' : 'border-gray-200 hover:bg-gray-50',
    select: isDarkMode ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-900 border border-gray-300',
  };
  const mode = isDarkMode ? 'dark' : 'light';

  const filteredPatients = patients.filter(p => {
    if (filterDevice === 'all') return true;
    if (filterDevice === 'with') return p.hasDevice;
    if (filterDevice === 'without') return !p.hasDevice;
    return true;
  });

  const sortedPatients = [...filteredPatients].sort((a, b) => {
    if (sortBy === 'bed') return a.bed - b.bed;
    if (sortBy === 'days') return b.patientDays - a.patientDays;
    if (sortBy === 'deviceDays') return (b.deviceDays || 0) - (a.deviceDays || 0);
    return 0;
  });

  return (
    <div className={`rounded-2xl border-2 p-4 ${theme.card}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <svg className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className={`text-xl font-bold ${theme.text}`}>Patient Demographics - {department.fullName}</h2>
        </div>
        <div className="flex gap-3">
          <select 
            value={filterDevice}
            onChange={(e) => setFilterDevice(e.target.value)}
            className={`${theme.select} px-3 py-1 rounded-lg text-sm`}
          >
            <option value="all">All Patients</option>
            <option value="with">With Device</option>
            <option value="without">Without Device</option>
          </select>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`${theme.select} px-3 py-1 rounded-lg text-sm`}
          >
            <option value="bed">Sort by Bed</option>
            <option value="days">Sort by Patient Days</option>
            <option value="deviceDays">Sort by Device Days</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className={theme.header}>
              <th className={`px-3 py-2 text-left ${theme.textMuted}`}>Bed</th>
              <th className={`px-3 py-2 text-left ${theme.textMuted}`}>Patient</th>
              <th className={`px-3 py-2 text-left ${theme.textMuted}`}>Age/Gender</th>
              <th className={`px-3 py-2 text-left ${theme.textMuted}`}>Diagnosis</th>
              <th className={`px-3 py-2 text-left ${theme.textMuted}`}>Isolation</th>
              <th className={`px-3 py-2 text-left ${theme.textMuted}`}>Pt Days</th>
              <th className={`px-3 py-2 text-left ${theme.textMuted}`}>Screening</th>
              <th className={`px-3 py-2 text-left ${theme.textMuted}`}>Culture</th>
              <th className={`px-3 py-2 text-left ${theme.textMuted}`}>Bundle</th>
              <th className={`px-3 py-2 text-left ${theme.textMuted}`}>Device</th>
              <th className={`px-3 py-2 text-left ${theme.textMuted}`}>Site</th>
              <th className={`px-3 py-2 text-left ${theme.textMuted}`}>Dev Days</th>
              <th className={`px-3 py-2 text-left ${theme.textMuted}`}>Insertion</th>
              <th className={`px-3 py-2 text-left ${theme.textMuted}`}>Risk</th>
            </tr>
          </thead>
          <tbody>
            {sortedPatients.map((patient) => (
              <tr 
                key={patient.id} 
                className={`border-b ${theme.row} ${patient.femoralAlarm ? (isDarkMode ? 'bg-red-900/20' : 'bg-red-50') : ''}`}
              >
                <td className="px-3 py-2">
                  <span className={`font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{patient.bed}</span>
                </td>
                <td className="px-3 py-2">
                  <div className={`font-semibold ${theme.text}`}>{patient.name}</div>
                  <div className={`text-xs ${theme.textMuted}`}>{patient.mrn}</div>
                </td>
                <td className={`px-3 py-2 ${theme.textMuted}`}>
                  {patient.age} {patient.ageUnit} / {patient.gender}
                </td>
                <td className={`px-3 py-2 ${theme.textMuted}`}>{patient.diagnosis}</td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${isolationColors[patient.isolation]?.[mode] || isolationColors['None'][mode]}`}>
                    {patient.isolation}
                  </span>
                </td>
                <td className={`px-3 py-2 font-semibold ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>{patient.patientDays}</td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    patient.screeningDone 
                      ? (isDarkMode ? 'bg-green-500/30 text-green-300' : 'bg-green-100 text-green-700')
                      : (isDarkMode ? 'bg-red-500/30 text-red-300' : 'bg-red-100 text-red-700')
                  }`}>
                    {patient.screeningDone ? 'Done' : 'Pending'}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    patient.cultureDone 
                      ? (isDarkMode ? 'bg-green-500/30 text-green-300' : 'bg-green-100 text-green-700')
                      : (isDarkMode ? 'bg-orange-500/30 text-orange-300' : 'bg-orange-100 text-orange-700')
                  }`}>
                    {patient.cultureDone ? 'Done' : 'Pending'}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    patient.bundleApplied 
                      ? (isDarkMode ? 'bg-green-500/30 text-green-300' : 'bg-green-100 text-green-700')
                      : (isDarkMode ? 'bg-yellow-500/30 text-yellow-300' : 'bg-yellow-100 text-yellow-700')
                  }`}>
                    {patient.bundleApplied ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-3 py-2">
                  {patient.hasDevice ? (
                    <span className={isDarkMode ? 'text-purple-400' : 'text-purple-600'}>{patient.deviceType}</span>
                  ) : (
                    <span className={theme.textMuted}>-</span>
                  )}
                </td>
                <td className="px-3 py-2">
                  {patient.hasDevice ? (
                    <span className={patient.femoralAlarm ? (isDarkMode ? 'text-red-400 font-bold' : 'text-red-600 font-bold') : theme.textMuted}>
                      {patient.deviceSite}
                    </span>
                  ) : (
                    <span className={theme.textMuted}>-</span>
                  )}
                </td>
                <td className="px-3 py-2">
                  {patient.hasDevice ? (
                    <span className={`font-semibold ${
                      patient.deviceDays > 7 
                        ? (isDarkMode ? 'text-red-400' : 'text-red-600')
                        : (isDarkMode ? 'text-green-400' : 'text-green-600')
                    }`}>
                      {patient.deviceDays}
                    </span>
                  ) : (
                    <span className={theme.textMuted}>-</span>
                  )}
                </td>
                <td className={`px-3 py-2 text-xs ${theme.textMuted}`}>
                  {patient.deviceInsertionDate || '-'}
                </td>
                <td className="px-3 py-2">
                  {(patient.clabsiRisk || patient.cautiRisk || patient.vapRisk) ? (
                    <div className="flex gap-1 flex-wrap">
                      {patient.clabsiRisk && <span className={`px-1 rounded text-xs ${isDarkMode ? 'bg-red-500/30 text-red-300' : 'bg-red-100 text-red-700'}`}>CLABSI</span>}
                      {patient.cautiRisk && <span className={`px-1 rounded text-xs ${isDarkMode ? 'bg-orange-500/30 text-orange-300' : 'bg-orange-100 text-orange-700'}`}>CAUTI</span>}
                      {patient.vapRisk && <span className={`px-1 rounded text-xs ${isDarkMode ? 'bg-purple-500/30 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>VAP</span>}
                    </div>
                  ) : (
                    <span className={theme.textMuted}>-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedPatients.length === 0 && (
        <div className={`text-center py-8 ${theme.textMuted}`}>
          No patients found
        </div>
      )}
    </div>
  );
}
