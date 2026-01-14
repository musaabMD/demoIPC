'use client';

import { useState } from 'react';

const isolationColors = {
  None: 'bg-slate-700 text-gray-300',
  Contact: 'bg-yellow-500/30 text-yellow-300 border border-yellow-500',
  Droplet: 'bg-blue-500/30 text-blue-300 border border-blue-500',
  Airborne: 'bg-red-500/30 text-red-300 border border-red-500',
  Protective: 'bg-green-500/30 text-green-300 border border-green-500',
};

export default function PatientTable({ patients, department }) {
  const [sortBy, setSortBy] = useState('bed');
  const [filterDevice, setFilterDevice] = useState('all');

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
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-slate-700/50 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">👥</span>
          <h2 className="text-xl font-bold text-white">Patient Demographics - {department.fullName}</h2>
        </div>
        <div className="flex gap-3">
          <select 
            value={filterDevice}
            onChange={(e) => setFilterDevice(e.target.value)}
            className="bg-slate-700 text-white px-3 py-1 rounded-lg text-sm"
          >
            <option value="all">All Patients</option>
            <option value="with">With Device</option>
            <option value="without">Without Device</option>
          </select>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-700 text-white px-3 py-1 rounded-lg text-sm"
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
            <tr className="bg-slate-800">
              <th className="px-3 py-2 text-left text-gray-400">Bed</th>
              <th className="px-3 py-2 text-left text-gray-400">Patient</th>
              <th className="px-3 py-2 text-left text-gray-400">Age/Gender</th>
              <th className="px-3 py-2 text-left text-gray-400">Diagnosis</th>
              <th className="px-3 py-2 text-left text-gray-400">Isolation</th>
              <th className="px-3 py-2 text-left text-gray-400">Pt Days</th>
              <th className="px-3 py-2 text-left text-gray-400">Screening</th>
              <th className="px-3 py-2 text-left text-gray-400">Culture</th>
              <th className="px-3 py-2 text-left text-gray-400">Bundle</th>
              <th className="px-3 py-2 text-left text-gray-400">Device</th>
              <th className="px-3 py-2 text-left text-gray-400">Site</th>
              <th className="px-3 py-2 text-left text-gray-400">Dev Days</th>
              <th className="px-3 py-2 text-left text-gray-400">Insertion</th>
              <th className="px-3 py-2 text-left text-gray-400">Risk</th>
            </tr>
          </thead>
          <tbody>
            {sortedPatients.map((patient) => (
              <tr 
                key={patient.id} 
                className={`border-b border-slate-700 hover:bg-slate-700/50 ${patient.femoralAlarm ? 'bg-red-900/20' : ''}`}
              >
                <td className="px-3 py-2">
                  <span className="font-bold text-blue-400">{patient.bed}</span>
                </td>
                <td className="px-3 py-2">
                  <div className="text-white font-semibold">{patient.name}</div>
                  <div className="text-xs text-gray-400">{patient.mrn}</div>
                </td>
                <td className="px-3 py-2 text-gray-300">
                  {patient.age} {patient.ageUnit} / {patient.gender}
                </td>
                <td className="px-3 py-2 text-gray-300">{patient.diagnosis}</td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${isolationColors[patient.isolation]}`}>
                    {patient.isolation}
                  </span>
                </td>
                <td className="px-3 py-2 text-cyan-400 font-semibold">{patient.patientDays}</td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-1 rounded text-xs ${patient.screeningDone ? 'bg-green-500/30 text-green-300' : 'bg-red-500/30 text-red-300'}`}>
                    {patient.screeningDone ? '✓ Done' : '✗ Pending'}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-1 rounded text-xs ${patient.cultureDone ? 'bg-green-500/30 text-green-300' : 'bg-orange-500/30 text-orange-300'}`}>
                    {patient.cultureDone ? '✓ Done' : '✗ Pending'}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-1 rounded text-xs ${patient.bundleApplied ? 'bg-green-500/30 text-green-300' : 'bg-yellow-500/30 text-yellow-300'}`}>
                    {patient.bundleApplied ? '✓ Yes' : '✗ No'}
                  </span>
                </td>
                <td className="px-3 py-2">
                  {patient.hasDevice ? (
                    <span className="text-purple-400">{patient.deviceType}</span>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>
                <td className="px-3 py-2">
                  {patient.hasDevice ? (
                    <span className={patient.femoralAlarm ? 'text-red-400 font-bold animate-pulse' : 'text-gray-300'}>
                      {patient.deviceSite}
                      {patient.femoralAlarm && ' ⚠️'}
                    </span>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>
                <td className="px-3 py-2">
                  {patient.hasDevice ? (
                    <span className={`font-semibold ${patient.deviceDays > 7 ? 'text-red-400' : 'text-green-400'}`}>
                      {patient.deviceDays}
                    </span>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>
                <td className="px-3 py-2 text-xs text-gray-400">
                  {patient.deviceInsertionDate || '-'}
                </td>
                <td className="px-3 py-2">
                  {(patient.clabsiRisk || patient.cautiRisk || patient.vapRisk) ? (
                    <div className="flex gap-1">
                      {patient.clabsiRisk && <span className="px-1 bg-red-500/30 text-red-300 rounded text-xs">CLABSI</span>}
                      {patient.cautiRisk && <span className="px-1 bg-orange-500/30 text-orange-300 rounded text-xs">CAUTI</span>}
                      {patient.vapRisk && <span className="px-1 bg-purple-500/30 text-purple-300 rounded text-xs">VAP</span>}
                    </div>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedPatients.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No patients found
        </div>
      )}
    </div>
  );
}
