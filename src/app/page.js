'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import DepartmentTabs from '@/components/DepartmentTabs';
import InfectionRates from '@/components/InfectionRates';
import OutbreakTracker from '@/components/OutbreakTracker';
import ScoreCards from '@/components/ScoreCards';
import PatientTable from '@/components/PatientTable';
import ScreeningStatus from '@/components/ScreeningStatus';
import DeviceAlerts from '@/components/DeviceAlerts';

// Hospitals
const HOSPITALS = [
  { id: 1, name: 'King Fahad Hospital' },
  { id: 2, name: 'Madinah General Hospital' },
  { id: 3, name: 'Ohud Hospital' },
  { id: 4, name: 'Maternity Hospital' },
];

// Departments
const DEPARTMENTS = [
  { id: 'icu', name: 'ICU', fullName: 'Intensive Care Unit' },
  { id: 'picu', name: 'PICU', fullName: 'Pediatric ICU' },
  { id: 'ccu', name: 'CCU', fullName: 'Cardiac Care Unit' },
  { id: 'nicu', name: 'NICU', fullName: 'Neonatal ICU' },
  { id: 'hematology', name: 'Hematology', fullName: 'Hematology Unit' },
  { id: 'aku', name: 'AKU', fullName: 'Acute Kidney Unit' },
  { id: 'oncology', name: 'Oncology', fullName: 'Oncology Unit' },
];

// SSI Operations (static data)
const SSI_OPERATIONS = [
  { type: 'CABG', count: 15, infections: 1, rate: 6.67 },
  { type: 'Hip Replacement', count: 22, infections: 0, rate: 0 },
  { type: 'Knee Replacement', count: 18, infections: 1, rate: 5.56 },
  { type: 'Colon Surgery', count: 12, infections: 2, rate: 16.67 },
  { type: 'C-Section', count: 45, infections: 1, rate: 2.22 },
];

// Generate mock patient data
const generatePatients = (department) => {
  const diagnoses = ['Sepsis', 'Pneumonia', 'ARDS', 'Heart Failure', 'Renal Failure', 'Post-Op', 'Trauma', 'Stroke'];
  const deviceTypes = ['Central Line', 'Ventilator', 'Foley Catheter', 'PICC Line', 'Arterial Line'];
  const deviceSites = ['Subclavian', 'Internal Jugular', 'Femoral', 'Radial', 'Brachial'];
  const isolationTypes = ['None', 'Contact', 'Droplet', 'Airborne', 'Protective'];
  
  const patients = [];
  const bedCount = department === 'nicu' ? 20 : department === 'picu' ? 15 : 12;
  
  // Use seeded random for consistent data
  let seed = department.charCodeAt(0) * 100;
  const seededRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  
  for (let i = 1; i <= bedCount; i++) {
    const isOccupied = seededRandom() > 0.15;
    if (isOccupied) {
      const hasDevice = seededRandom() > 0.3;
      const deviceType = hasDevice ? deviceTypes[Math.floor(seededRandom() * deviceTypes.length)] : null;
      const site = hasDevice ? deviceSites[Math.floor(seededRandom() * deviceSites.length)] : null;
      const insertionDays = hasDevice ? Math.floor(seededRandom() * 14) + 1 : 0;
      const isFemoralOver7Days = site === 'Femoral' && insertionDays > 7;
      
      patients.push({
        id: `${department}-${i}`,
        bed: i,
        name: `Patient ${department.toUpperCase()}-${String(i).padStart(2, '0')}`,
        mrn: `MRN-2024-${String(1000 + i * 7)}`,
        age: department === 'nicu' ? Math.floor(seededRandom() * 28) + 1 : department === 'picu' ? Math.floor(seededRandom() * 14) + 1 : Math.floor(seededRandom() * 60) + 20,
        ageUnit: department === 'nicu' ? 'days' : 'years',
        gender: seededRandom() > 0.5 ? 'M' : 'F',
        diagnosis: diagnoses[Math.floor(seededRandom() * diagnoses.length)],
        admissionDate: new Date(Date.now() - (i * 2) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        patientDays: Math.floor(seededRandom() * 14) + 1,
        isolation: isolationTypes[Math.floor(seededRandom() * isolationTypes.length)],
        
        // Screening
        screeningDone: seededRandom() > 0.3,
        screeningType: seededRandom() > 0.5 ? 'MRSA' : 'VRE',
        cultureDone: seededRandom() > 0.4,
        cultureResult: seededRandom() > 0.7 ? 'Positive' : 'Negative',
        
        // Bundle
        bundleApplied: seededRandom() > 0.2,
        bundleCompliance: Math.floor(seededRandom() * 40) + 60,
        
        // Device
        hasDevice,
        deviceType,
        deviceSite: site,
        deviceInsertionDate: hasDevice ? new Date(Date.now() - insertionDays * 24 * 60 * 60 * 1000).toLocaleDateString() : null,
        deviceDays: insertionDays,
        deviceRemoved: hasDevice ? seededRandom() > 0.8 : false,
        deviceRemovalDate: null,
        femoralAlarm: isFemoralOver7Days,
        
        // Risk
        clabsiRisk: deviceType === 'Central Line' || deviceType === 'PICC Line',
        cautiRisk: deviceType === 'Foley Catheter',
        vapRisk: deviceType === 'Ventilator',
      });
    }
  }
  return patients;
};

// Generate infection rates with seeded random
const generateRates = (seed) => {
  const seededRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  return {
    vae: { rate: (seededRandom() * 3).toFixed(2), benchmark: 2.0, events: Math.floor(seededRandom() * 5), deviceDays: Math.floor(seededRandom() * 500) + 200 },
    clabsi: { rate: (seededRandom() * 2).toFixed(2), benchmark: 1.0, events: Math.floor(seededRandom() * 3), deviceDays: Math.floor(seededRandom() * 400) + 150 },
    cauti: { rate: (seededRandom() * 2.5).toFixed(2), benchmark: 1.5, events: Math.floor(seededRandom() * 4), deviceDays: Math.floor(seededRandom() * 450) + 180 },
    ssi: { rate: (seededRandom() * 1.5).toFixed(2), benchmark: 1.0, events: Math.floor(seededRandom() * 2), procedures: Math.floor(seededRandom() * 100) + 50 },
  };
};

// Static outbreak data
const OUTBREAKS = [
  { id: 1, area: 'ICU Bay 1', organism: 'MRSA', class: 'B', cases: 3, startDate: '2024-01-10', status: 'Active' },
  { id: 2, area: 'ICU Bay 2', organism: 'C. diff', class: 'A', cases: 2, startDate: '2024-01-12', status: 'Under Investigation' },
];

export default function Home() {
  const [selectedHospital, setSelectedHospital] = useState(HOSPITALS[0]);
  const [selectedDepartment, setSelectedDepartment] = useState(DEPARTMENTS[0]);
  const [patients, setPatients] = useState([]);
  const [rates, setRates] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isClient, setIsClient] = useState(false);

  // Initialize on client only to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
    setLastUpdate(new Date());
  }, []);

  useEffect(() => {
    if (isClient) {
      setPatients(generatePatients(selectedDepartment.id));
      setRates(generateRates(selectedHospital.id * 100 + selectedDepartment.id.charCodeAt(0)));
    }
  }, [selectedHospital, selectedDepartment, isClient]);

  useEffect(() => {
    if (!isClient) return;
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, [isClient]);

  // Calculate stats
  const occupiedBeds = patients.filter(b => b);
  const totalPatients = occupiedBeds.length;
  const patientsWithDevices = patients.filter(p => p.hasDevice).length;
  const screeningNotDone = patients.filter(p => !p.screeningDone);
  const cultureNotDone = patients.filter(p => !p.cultureDone);
  const bundleNotApplied = patients.filter(p => !p.bundleApplied);
  const femoralAlerts = patients.filter(p => p.femoralAlarm);
  const totalDeviceDays = patients.reduce((sum, p) => sum + (p.deviceDays || 0), 0);
  const totalPatientDays = patients.reduce((sum, p) => sum + (p.patientDays || 0), 0);

  // Static scores based on hospital/department
  const ipccScore = 85 + (selectedHospital.id * 2) % 15;
  const bicslScore = 88 + (selectedDepartment.id.charCodeAt(0)) % 12;
  const handHygieneCompliance = 90 + (selectedHospital.id + selectedDepartment.id.charCodeAt(0)) % 10;
  const cleaningCompliance = 92 + (selectedHospital.id * 3) % 8;

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏥</div>
          <div className="text-2xl text-white font-bold">ICU Infection Control Dashboard</div>
          <div className="text-gray-400 mt-2">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header 
        selectedHospital={selectedHospital}
        hospitals={HOSPITALS}
        onHospitalChange={setSelectedHospital}
      />
      
      <DepartmentTabs 
        departments={DEPARTMENTS}
        selected={selectedDepartment}
        onSelect={setSelectedDepartment}
      />

      <main className="p-4 space-y-4">
        {/* Top Row - Key Metrics */}
        <div className="grid grid-cols-6 gap-3">
          <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border-2 border-blue-500/30 rounded-xl p-4 text-center">
            <div className="text-4xl font-bold text-blue-400">{totalPatients}</div>
            <div className="text-sm text-gray-400">Total Patients</div>
          </div>
          <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border-2 border-purple-500/30 rounded-xl p-4 text-center">
            <div className="text-4xl font-bold text-purple-400">{patientsWithDevices}</div>
            <div className="text-sm text-gray-400">On Devices</div>
          </div>
          <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-800/20 border-2 border-cyan-500/30 rounded-xl p-4 text-center">
            <div className="text-4xl font-bold text-cyan-400">{totalPatientDays}</div>
            <div className="text-sm text-gray-400">Patient Days</div>
          </div>
          <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border-2 border-green-500/30 rounded-xl p-4 text-center">
            <div className="text-4xl font-bold text-green-400">{totalDeviceDays}</div>
            <div className="text-sm text-gray-400">Device Days</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border-2 border-yellow-500/30 rounded-xl p-4 text-center">
            <div className="text-4xl font-bold text-yellow-400">{handHygieneCompliance}%</div>
            <div className="text-sm text-gray-400">Hand Hygiene</div>
          </div>
          <div className={`bg-gradient-to-br ${femoralAlerts.length > 0 ? 'from-red-600/30 to-red-800/30 border-red-500' : 'from-green-600/20 to-green-800/20 border-green-500/30'} border-2 rounded-xl p-4 text-center ${femoralAlerts.length > 0 ? 'animate-pulse' : ''}`}>
            <div className={`text-4xl font-bold ${femoralAlerts.length > 0 ? 'text-red-400' : 'text-green-400'}`}>{femoralAlerts.length}</div>
            <div className="text-sm text-gray-400">Femoral Alerts</div>
          </div>
        </div>

        {/* Second Row - Infection Rates & Scores */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8">
            {rates && <InfectionRates rates={rates} operations={SSI_OPERATIONS} />}
          </div>
          <div className="col-span-4">
            <ScoreCards 
              ipccScore={ipccScore}
              bicslScore={bicslScore}
              handHygiene={handHygieneCompliance}
              cleaning={cleaningCompliance}
            />
          </div>
        </div>

        {/* Third Row - Outbreak & Compliance */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <OutbreakTracker outbreaks={OUTBREAKS} />
          </div>
          <div className="col-span-4">
            <ScreeningStatus 
              screeningNotDone={screeningNotDone}
              cultureNotDone={cultureNotDone}
              bundleNotApplied={bundleNotApplied}
            />
          </div>
          <div className="col-span-4">
            <DeviceAlerts alerts={femoralAlerts} allPatients={patients} />
          </div>
        </div>

        {/* Fourth Row - Patient Table */}
        <PatientTable patients={patients} department={selectedDepartment} />

        {/* Footer */}
        <footer className="text-center py-2 text-gray-500 text-sm">
          <p>Last Updated: {lastUpdate?.toLocaleTimeString() || '--:--:--'} | {selectedHospital.name} - {selectedDepartment.fullName}</p>
        </footer>
      </main>
    </div>
  );
}
