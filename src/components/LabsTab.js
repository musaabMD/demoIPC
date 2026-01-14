'use client';

import { useState, useMemo } from 'react';

// Generate mock lab data across all hospitals
const generateLabData = () => {
  const hospitals = ['King Fahad Hospital', 'Madinah General Hospital', 'Ohud Hospital', 'Maternity Hospital'];
  
  // Inpatient departments (wards/ICUs)
  const inpatientDepts = ['ICU', 'PICU', 'CCU', 'NICU', 'Hematology', 'AKU', 'Oncology', 'Medical Ward', 'Surgical Ward'];
  // Outpatient departments (clinics)
  const outpatientDepts = ['OPD Clinic', 'Infectious Disease Clinic', 'Pulmonary Clinic', 'Pediatric Clinic', 'General Clinic'];
  
  const serologyTests = [
    { name: 'Measles IgM', category: 'Serology', communicable: true },
    { name: 'Measles IgG', category: 'Serology', communicable: true },
    { name: 'Varicella IgM', category: 'Serology', communicable: true },
    { name: 'Varicella IgG', category: 'Serology', communicable: true },
    { name: 'Rubella IgM', category: 'Serology', communicable: true },
    { name: 'Rubella IgG', category: 'Serology', communicable: true },
    { name: 'Hepatitis B Surface Ag', category: 'Serology', communicable: true },
    { name: 'Hepatitis C Ab', category: 'Serology', communicable: true },
    { name: 'HIV 1/2 Ab', category: 'Serology', communicable: true },
    { name: 'CMV IgM', category: 'Serology', communicable: true },
    { name: 'EBV IgM', category: 'Serology', communicable: false },
    { name: 'Mumps IgM', category: 'Serology', communicable: true },
  ];
  
  const cultureTests = [
    { name: 'Blood Culture', category: 'Culture', specimen: 'Blood' },
    { name: 'Urine Culture', category: 'Culture', specimen: 'Urine' },
    { name: 'Sputum Culture', category: 'Culture', specimen: 'Sputum' },
    { name: 'Wound Culture', category: 'Culture', specimen: 'Wound' },
    { name: 'Stool Culture', category: 'Culture', specimen: 'Stool' },
    { name: 'CSF Culture', category: 'Culture', specimen: 'CSF' },
    { name: 'Throat Swab Culture', category: 'Culture', specimen: 'Throat' },
    { name: 'Nasal Swab (MRSA)', category: 'Culture', specimen: 'Nasal' },
    { name: 'Rectal Swab (VRE)', category: 'Culture', specimen: 'Rectal' },
  ];
  
  const afbTests = [
    { name: 'AFB Smear', category: 'AFB', critical: true },
    { name: 'AFB Culture', category: 'AFB', critical: true },
    { name: 'TB PCR (GeneXpert)', category: 'AFB', critical: true },
  ];
  
  const organisms = ['MRSA', 'VRE', 'ESBL E.coli', 'Pseudomonas', 'Klebsiella', 'Acinetobacter', 'C. diff', 'Candida', 'No Growth'];
  
  let seed = 12345;
  const seededRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  
  const today = new Date();
  const labs = [];
  let labId = 1;
  
  // Generate serology results
  for (let i = 0; i < 50; i++) {
    const test = serologyTests[Math.floor(seededRandom() * serologyTests.length)];
    const isPositive = seededRandom() > 0.7;
    const hospital = hospitals[Math.floor(seededRandom() * hospitals.length)];
    const isOutpatient = seededRandom() > 0.7; // 30% outpatient
    const dept = isOutpatient 
      ? outpatientDepts[Math.floor(seededRandom() * outpatientDepts.length)]
      : inpatientDepts[Math.floor(seededRandom() * inpatientDepts.length)];
    const age = Math.floor(seededRandom() * 70) + 1;
    const isolationDone = isPositive && !isOutpatient ? seededRandom() > 0.3 : null;
    
    // Generate dates within last 7 days
    const daysAgo = Math.floor(seededRandom() * 7);
    const orderDate = new Date(today);
    orderDate.setDate(orderDate.getDate() - daysAgo);
    const resultDate = new Date(orderDate);
    resultDate.setDate(resultDate.getDate() + Math.floor(seededRandom() * 2));
    
    labs.push({
      id: labId++,
      labId: `LAB-${String(labId).padStart(5, '0')}`,
      patientId: `MRN-${String(Math.floor(seededRandom() * 9000) + 1000)}`,
      patientName: `Patient ${labId}`,
      age,
      gender: seededRandom() > 0.5 ? 'M' : 'F',
      hospital,
      department: dept,
      patientType: isOutpatient ? 'Outpatient' : 'Inpatient',
      testName: test.name,
      category: test.category,
      result: isPositive ? 'Positive' : 'Negative',
      value: isPositive ? (test.name.includes('IgM') ? 'Reactive' : '>1:64') : (test.name.includes('IgM') ? 'Non-Reactive' : '<1:8'),
      orderDate: orderDate.toISOString().split('T')[0],
      resultDate: resultDate.toISOString().split('T')[0],
      orderDateObj: orderDate,
      critical: isPositive && test.communicable,
      isolationRequired: isPositive && test.communicable && !isOutpatient,
      isolationDone,
      notified: isPositive ? seededRandom() > 0.2 : null,
      actionRequired: isPositive && !isOutpatient && !isolationDone,
    });
  }
  
  // Generate AFB results (TB)
  for (let i = 0; i < 20; i++) {
    const test = afbTests[Math.floor(seededRandom() * afbTests.length)];
    const isPositive = seededRandom() > 0.85;
    const hospital = hospitals[Math.floor(seededRandom() * hospitals.length)];
    const isOutpatient = seededRandom() > 0.8; // 20% outpatient for TB
    const dept = isOutpatient 
      ? outpatientDepts[Math.floor(seededRandom() * outpatientDepts.length)]
      : inpatientDepts[Math.floor(seededRandom() * inpatientDepts.length)];
    const age = Math.floor(seededRandom() * 70) + 20;
    const isolationDone = isPositive && !isOutpatient ? seededRandom() > 0.2 : null;
    
    const daysAgo = Math.floor(seededRandom() * 7);
    const orderDate = new Date(today);
    orderDate.setDate(orderDate.getDate() - daysAgo);
    const resultDate = new Date(orderDate);
    resultDate.setDate(resultDate.getDate() + Math.floor(seededRandom() * 2));
    
    labs.push({
      id: labId++,
      labId: `LAB-${String(labId).padStart(5, '0')}`,
      patientId: `MRN-${String(Math.floor(seededRandom() * 9000) + 1000)}`,
      patientName: `Patient ${labId}`,
      age,
      gender: seededRandom() > 0.5 ? 'M' : 'F',
      hospital,
      department: dept,
      patientType: isOutpatient ? 'Outpatient' : 'Inpatient',
      testName: test.name,
      category: test.category,
      result: isPositive ? 'Positive' : 'Negative',
      value: isPositive ? (test.name === 'AFB Smear' ? '3+' : 'MTB Detected') : 'No AFB Seen',
      orderDate: orderDate.toISOString().split('T')[0],
      resultDate: resultDate.toISOString().split('T')[0],
      orderDateObj: orderDate,
      critical: isPositive,
      isolationRequired: isPositive && !isOutpatient,
      isolationDone,
      notified: isPositive ? seededRandom() > 0.1 : null,
      actionRequired: isPositive && !isOutpatient && !isolationDone,
      tbAlarm: isPositive,
    });
  }
  
  // Generate Culture results
  for (let i = 0; i < 60; i++) {
    const test = cultureTests[Math.floor(seededRandom() * cultureTests.length)];
    const hasGrowth = seededRandom() > 0.4;
    const organism = hasGrowth ? organisms[Math.floor(seededRandom() * (organisms.length - 1))] : 'No Growth';
    const hospital = hospitals[Math.floor(seededRandom() * hospitals.length)];
    const isOutpatient = seededRandom() > 0.85; // 15% outpatient for cultures
    const dept = isOutpatient 
      ? outpatientDepts[Math.floor(seededRandom() * outpatientDepts.length)]
      : inpatientDepts[Math.floor(seededRandom() * inpatientDepts.length)];
    const age = Math.floor(seededRandom() * 80) + 1;
    const isMDRO = ['MRSA', 'VRE', 'ESBL E.coli', 'Acinetobacter'].includes(organism);
    const isolationDone = isMDRO && !isOutpatient ? seededRandom() > 0.25 : null;
    
    const daysAgo = Math.floor(seededRandom() * 7);
    const orderDate = new Date(today);
    orderDate.setDate(orderDate.getDate() - daysAgo);
    const resultDate = new Date(orderDate);
    resultDate.setDate(resultDate.getDate() + Math.floor(seededRandom() * 3));
    
    labs.push({
      id: labId++,
      labId: `LAB-${String(labId).padStart(5, '0')}`,
      patientId: `MRN-${String(Math.floor(seededRandom() * 9000) + 1000)}`,
      patientName: `Patient ${labId}`,
      age,
      gender: seededRandom() > 0.5 ? 'M' : 'F',
      hospital,
      department: dept,
      patientType: isOutpatient ? 'Outpatient' : 'Inpatient',
      testName: test.name,
      category: test.category,
      specimen: test.specimen,
      result: hasGrowth ? 'Positive' : 'Negative',
      value: organism,
      orderDate: orderDate.toISOString().split('T')[0],
      resultDate: resultDate.toISOString().split('T')[0],
      orderDateObj: orderDate,
      critical: isMDRO,
      isolationRequired: isMDRO && !isOutpatient,
      isolationDone,
      notified: isMDRO ? seededRandom() > 0.15 : null,
      actionRequired: isMDRO && !isOutpatient && !isolationDone,
      mdro: isMDRO,
    });
  }
  
  return labs.sort((a, b) => {
    if (a.actionRequired && !b.actionRequired) return -1;
    if (!a.actionRequired && b.actionRequired) return 1;
    if (a.critical && !b.critical) return -1;
    if (!a.critical && b.critical) return 1;
    return new Date(b.orderDate) - new Date(a.orderDate);
  });
};

export default function LabsTab({ isDarkMode }) {
  const [labData] = useState(() => generateLabData());
  const [filters, setFilters] = useState({
    hospital: 'all',
    category: 'all',
    result: 'all',
    patientType: 'all',
    dateRange: 'all',
    actionRequired: false,
    isolationPending: false,
  });
  const [searchTerm, setSearchTerm] = useState('');

  const theme = {
    card: isDarkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-gray-200 shadow-sm',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-600',
    header: isDarkMode ? 'bg-slate-800' : 'bg-gray-100',
    row: isDarkMode ? 'border-slate-700 hover:bg-slate-700/50' : 'border-gray-200 hover:bg-gray-50',
    select: isDarkMode ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-900 border-gray-300',
    input: isDarkMode ? 'bg-slate-700 text-white border-slate-600 placeholder-gray-400' : 'bg-white text-gray-900 border-gray-300 placeholder-gray-500',
    filterBtn: isDarkMode ? 'bg-slate-700 text-gray-300 hover:bg-slate-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  const filteredLabs = useMemo(() => {
    return labData.filter(lab => {
      if (filters.hospital !== 'all' && lab.hospital !== filters.hospital) return false;
      if (filters.category !== 'all' && lab.category !== filters.category) return false;
      if (filters.result !== 'all' && lab.result !== filters.result) return false;
      if (filters.patientType !== 'all' && lab.patientType !== filters.patientType) return false;
      if (filters.actionRequired && !lab.actionRequired) return false;
      if (filters.isolationPending && !(lab.isolationRequired && !lab.isolationDone)) return false;
      
      // Date filter
      if (filters.dateRange === 'today') {
        const orderDate = new Date(lab.orderDate);
        orderDate.setHours(0, 0, 0, 0);
        if (orderDate.getTime() !== today.getTime()) return false;
      } else if (filters.dateRange === 'week') {
        const orderDate = new Date(lab.orderDate);
        if (orderDate < weekAgo) return false;
      }
      
      if (searchTerm && !lab.patientId.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !lab.testName.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !lab.value?.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });
  }, [labData, filters, searchTerm, today, weekAgo]);

  const stats = useMemo(() => {
    const positive = labData.filter(l => l.result === 'Positive').length;
    const actionRequired = labData.filter(l => l.actionRequired).length;
    const tbPositive = labData.filter(l => l.tbAlarm).length;
    const mdroPositive = labData.filter(l => l.mdro).length;
    const isolationPending = labData.filter(l => l.isolationRequired && !l.isolationDone).length;
    const orderedToday = labData.filter(l => {
      const d = new Date(l.orderDate);
      d.setHours(0, 0, 0, 0);
      return d.getTime() === today.getTime();
    }).length;
    return { positive, actionRequired, tbPositive, mdroPositive, isolationPending, orderedToday };
  }, [labData, today]);

  const hospitals = ['King Fahad Hospital', 'Madinah General Hospital', 'Ohud Hospital', 'Maternity Hospital'];

  return (
    <div className="p-4 space-y-4">
      {/* Stats Row */}
      <div className="grid grid-cols-6 gap-3">
        <StatCard label="Total Results" value={labData.length} color="blue" isDarkMode={isDarkMode} />
        <StatCard label="Ordered Today" value={stats.orderedToday} color="cyan" isDarkMode={isDarkMode} />
        <StatCard label="Positive Results" value={stats.positive} color="orange" isDarkMode={isDarkMode} />
        <StatCard label="TB Positive" value={stats.tbPositive} color="red" isDarkMode={isDarkMode} alert={stats.tbPositive > 0} />
        <StatCard label="MDRO Detected" value={stats.mdroPositive} color="purple" isDarkMode={isDarkMode} />
        <StatCard label="Isolation Pending" value={stats.isolationPending} color="yellow" isDarkMode={isDarkMode} alert={stats.isolationPending > 0} />
      </div>

      {/* TB Alarm Banner */}
      {stats.tbPositive > 0 && (
        <div className={`p-4 rounded-xl border-2 ${isDarkMode ? 'bg-red-900/30 border-red-500' : 'bg-red-100 border-red-400'} animate-pulse`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className={`w-8 h-8 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <div className={`font-bold text-lg ${isDarkMode ? 'text-red-400' : 'text-red-700'}`}>TB ALERT - IMMEDIATE ACTION REQUIRED</div>
                <div className={isDarkMode ? 'text-red-300' : 'text-red-600'}>{stats.tbPositive} patient(s) with positive AFB/TB results require airborne isolation</div>
              </div>
            </div>
            <button 
              onClick={() => setFilters(f => ({ ...f, category: 'AFB', result: 'Positive' }))}
              className={`px-4 py-2 rounded-lg font-semibold ${isDarkMode ? 'bg-red-600 text-white hover:bg-red-500' : 'bg-red-600 text-white hover:bg-red-700'}`}
            >
              View TB Cases
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className={`rounded-2xl border-2 p-4 ${theme.card}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-bold ${theme.text}`}>Lab Results - Infection Control Tracking</h2>
          <div className={`text-sm ${theme.textMuted}`}>Madina Region Hospitals</div>
        </div>
        
        <div className="grid grid-cols-8 gap-3 mb-4">
          <input
            type="text"
            placeholder="Search MRN, Test, Organism..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`${theme.input} px-3 py-2 rounded-lg border text-sm col-span-2`}
          />
          <select 
            value={filters.hospital}
            onChange={(e) => setFilters(f => ({ ...f, hospital: e.target.value }))}
            className={`${theme.select} px-3 py-2 rounded-lg border text-sm`}
          >
            <option value="all">All Hospitals</option>
            {hospitals.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
          <select 
            value={filters.category}
            onChange={(e) => setFilters(f => ({ ...f, category: e.target.value }))}
            className={`${theme.select} px-3 py-2 rounded-lg border text-sm`}
          >
            <option value="all">All Categories</option>
            <option value="Serology">Serology</option>
            <option value="AFB">AFB (TB)</option>
            <option value="Culture">Culture</option>
          </select>
          <select 
            value={filters.result}
            onChange={(e) => setFilters(f => ({ ...f, result: e.target.value }))}
            className={`${theme.select} px-3 py-2 rounded-lg border text-sm`}
          >
            <option value="all">All Results</option>
            <option value="Positive">Positive Only</option>
            <option value="Negative">Negative Only</option>
          </select>
          <select 
            value={filters.patientType}
            onChange={(e) => setFilters(f => ({ ...f, patientType: e.target.value }))}
            className={`${theme.select} px-3 py-2 rounded-lg border text-sm`}
          >
            <option value="all">All Patients</option>
            <option value="Inpatient">Inpatient</option>
            <option value="Outpatient">Outpatient</option>
          </select>
          <select 
            value={filters.dateRange}
            onChange={(e) => setFilters(f => ({ ...f, dateRange: e.target.value }))}
            className={`${theme.select} px-3 py-2 rounded-lg border text-sm`}
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
          </select>
          <button
            onClick={() => setFilters({ hospital: 'all', category: 'all', result: 'all', patientType: 'all', dateRange: 'all', actionRequired: false, isolationPending: false })}
            className={`px-3 py-2 rounded-lg text-sm font-medium ${isDarkMode ? 'bg-slate-600 text-white hover:bg-slate-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Clear
          </button>
        </div>
        
        {/* Quick Filters */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFilters(f => ({ ...f, actionRequired: !f.actionRequired }))}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filters.actionRequired 
                ? 'bg-red-600 text-white'
                : theme.filterBtn
            }`}
          >
            Action Required ({stats.actionRequired})
          </button>
          <button
            onClick={() => setFilters(f => ({ ...f, isolationPending: !f.isolationPending }))}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filters.isolationPending 
                ? 'bg-yellow-600 text-white'
                : theme.filterBtn
            }`}
          >
            Isolation Pending ({stats.isolationPending})
          </button>
          <button
            onClick={() => setFilters(f => ({ ...f, dateRange: 'today' }))}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filters.dateRange === 'today' 
                ? 'bg-cyan-600 text-white'
                : theme.filterBtn
            }`}
          >
            Ordered Today ({stats.orderedToday})
          </button>
          <button
            onClick={() => setFilters(f => ({ ...f, category: 'AFB', result: 'Positive' }))}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${theme.filterBtn}`}
          >
            TB Cases ({stats.tbPositive})
          </button>
          <button
            onClick={() => setFilters(f => ({ ...f, category: 'Serology', result: 'Positive' }))}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${theme.filterBtn}`}
          >
            Serology Positive
          </button>
          <button
            onClick={() => setFilters(f => ({ ...f, category: 'Culture', result: 'Positive' }))}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${theme.filterBtn}`}
          >
            Culture Positive
          </button>
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={theme.header}>
                <th className={`px-3 py-2 text-left ${theme.textMuted}`}>Status</th>
                <th className={`px-3 py-2 text-left ${theme.textMuted}`}>Lab ID</th>
                <th className={`px-3 py-2 text-left ${theme.textMuted}`}>Patient</th>
                <th className={`px-3 py-2 text-left ${theme.textMuted}`}>Age/Gender</th>
                <th className={`px-3 py-2 text-left ${theme.textMuted}`}>Type</th>
                <th className={`px-3 py-2 text-left ${theme.textMuted}`}>Hospital</th>
                <th className={`px-3 py-2 text-left ${theme.textMuted}`}>Dept</th>
                <th className={`px-3 py-2 text-left ${theme.textMuted}`}>Test</th>
                <th className={`px-3 py-2 text-left ${theme.textMuted}`}>Category</th>
                <th className={`px-3 py-2 text-left ${theme.textMuted}`}>Result</th>
                <th className={`px-3 py-2 text-left ${theme.textMuted}`}>Value</th>
                <th className={`px-3 py-2 text-left ${theme.textMuted}`}>Order Date</th>
                <th className={`px-3 py-2 text-left ${theme.textMuted}`}>Isolation</th>
                <th className={`px-3 py-2 text-left ${theme.textMuted}`}>Notified</th>
              </tr>
            </thead>
            <tbody>
              {filteredLabs.slice(0, 50).map((lab) => (
                <tr 
                  key={lab.id} 
                  className={`border-b ${theme.row} ${
                    lab.tbAlarm ? (isDarkMode ? 'bg-red-900/30' : 'bg-red-50') :
                    lab.actionRequired ? (isDarkMode ? 'bg-yellow-900/20' : 'bg-yellow-50') : ''
                  }`}
                >
                  <td className="px-3 py-2">
                    {lab.tbAlarm && (
                      <span className={`px-2 py-1 rounded text-xs font-bold ${isDarkMode ? 'bg-red-600 text-white' : 'bg-red-500 text-white'} animate-pulse`}>
                        TB ALERT
                      </span>
                    )}
                    {!lab.tbAlarm && lab.actionRequired && (
                      <span className={`px-2 py-1 rounded text-xs font-bold ${isDarkMode ? 'bg-yellow-600 text-white' : 'bg-yellow-500 text-white'}`}>
                        ACTION
                      </span>
                    )}
                    {!lab.tbAlarm && !lab.actionRequired && lab.critical && (
                      <span className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-orange-600/50 text-orange-300' : 'bg-orange-100 text-orange-700'}`}>
                        Critical
                      </span>
                    )}
                  </td>
                  <td className={`px-3 py-2 font-mono text-xs ${theme.textMuted}`}>{lab.labId}</td>
                  <td className="px-3 py-2">
                    <div className={`font-semibold ${theme.text}`}>{lab.patientId}</div>
                  </td>
                  <td className={`px-3 py-2 ${theme.textMuted}`}>{lab.age} / {lab.gender}</td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      lab.patientType === 'Inpatient'
                        ? (isDarkMode ? 'bg-blue-600/30 text-blue-300' : 'bg-blue-100 text-blue-700')
                        : (isDarkMode ? 'bg-gray-600/30 text-gray-300' : 'bg-gray-100 text-gray-700')
                    }`}>
                      {lab.patientType}
                    </span>
                  </td>
                  <td className={`px-3 py-2 text-xs ${theme.textMuted}`}>{lab.hospital.replace(' Hospital', '')}</td>
                  <td className={`px-3 py-2 text-xs ${theme.textMuted}`}>{lab.department}</td>
                  <td className={`px-3 py-2 ${theme.text}`}>{lab.testName}</td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      lab.category === 'AFB' ? (isDarkMode ? 'bg-red-600/30 text-red-300' : 'bg-red-100 text-red-700') :
                      lab.category === 'Serology' ? (isDarkMode ? 'bg-purple-600/30 text-purple-300' : 'bg-purple-100 text-purple-700') :
                      (isDarkMode ? 'bg-cyan-600/30 text-cyan-300' : 'bg-cyan-100 text-cyan-700')
                    }`}>
                      {lab.category}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      lab.result === 'Positive'
                        ? (isDarkMode ? 'bg-red-600/50 text-red-300' : 'bg-red-100 text-red-700')
                        : (isDarkMode ? 'bg-green-600/30 text-green-300' : 'bg-green-100 text-green-700')
                    }`}>
                      {lab.result}
                    </span>
                  </td>
                  <td className={`px-3 py-2 text-xs font-medium ${
                    lab.mdro ? (isDarkMode ? 'text-orange-400' : 'text-orange-600') : theme.textMuted
                  }`}>
                    {lab.value}
                  </td>
                  <td className={`px-3 py-2 text-xs ${theme.textMuted}`}>{lab.orderDate}</td>
                  <td className="px-3 py-2">
                    {lab.isolationRequired ? (
                      <span className={`px-2 py-1 rounded text-xs ${
                        lab.isolationDone
                          ? (isDarkMode ? 'bg-green-600/30 text-green-300' : 'bg-green-100 text-green-700')
                          : (isDarkMode ? 'bg-red-600/50 text-red-300' : 'bg-red-100 text-red-700')
                      }`}>
                        {lab.isolationDone ? 'Done' : 'PENDING'}
                      </span>
                    ) : (
                      <span className={theme.textMuted}>-</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    {lab.notified !== null ? (
                      <span className={`px-2 py-1 rounded text-xs ${
                        lab.notified
                          ? (isDarkMode ? 'bg-green-600/30 text-green-300' : 'bg-green-100 text-green-700')
                          : (isDarkMode ? 'bg-yellow-600/30 text-yellow-300' : 'bg-yellow-100 text-yellow-700')
                      }`}>
                        {lab.notified ? 'Yes' : 'No'}
                      </span>
                    ) : (
                      <span className={theme.textMuted}>-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLabs.length === 0 && (
          <div className={`text-center py-8 ${theme.textMuted}`}>
            No lab results found matching filters
          </div>
        )}

        {filteredLabs.length > 50 && (
          <div className={`text-center py-4 ${theme.textMuted}`}>
            Showing 50 of {filteredLabs.length} results
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color, isDarkMode, alert }) {
  const colors = {
    blue: isDarkMode ? 'from-blue-600/20 to-blue-800/20 border-blue-500/30 text-blue-400' : 'from-blue-50 to-blue-100 border-blue-200 text-blue-600',
    cyan: isDarkMode ? 'from-cyan-600/20 to-cyan-800/20 border-cyan-500/30 text-cyan-400' : 'from-cyan-50 to-cyan-100 border-cyan-200 text-cyan-600',
    purple: isDarkMode ? 'from-purple-600/20 to-purple-800/20 border-purple-500/30 text-purple-400' : 'from-purple-50 to-purple-100 border-purple-200 text-purple-600',
    orange: isDarkMode ? 'from-orange-600/20 to-orange-800/20 border-orange-500/30 text-orange-400' : 'from-orange-50 to-orange-100 border-orange-200 text-orange-600',
    yellow: isDarkMode ? 'from-yellow-600/20 to-yellow-800/20 border-yellow-500/30 text-yellow-400' : 'from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-600',
    red: isDarkMode ? 'from-red-600/30 to-red-800/30 border-red-500 text-red-400' : 'from-red-50 to-red-100 border-red-300 text-red-600',
    green: isDarkMode ? 'from-green-600/20 to-green-800/20 border-green-500/30 text-green-400' : 'from-green-50 to-green-100 border-green-200 text-green-600',
  };
  
  return (
    <div className={`bg-gradient-to-br ${colors[color]} border-2 rounded-xl p-4 text-center ${alert ? 'animate-pulse' : ''}`}>
      <div className={`text-4xl font-bold ${colors[color].split(' ').pop()}`}>{value}</div>
      <div className={isDarkMode ? 'text-sm text-gray-400' : 'text-sm text-gray-600'}>{label}</div>
    </div>
  );
}
