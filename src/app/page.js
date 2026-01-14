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
import RoomOverview from '@/components/RoomOverview';
import LabsTab from '@/components/LabsTab';

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

// SSI Operations
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
      const isolation = isolationTypes[Math.floor(seededRandom() * isolationTypes.length)];
      
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
        isolation,
        screeningDone: seededRandom() > 0.3,
        screeningType: seededRandom() > 0.5 ? 'MRSA' : 'VRE',
        cultureDone: seededRandom() > 0.4,
        cultureResult: seededRandom() > 0.7 ? 'Positive' : 'Negative',
        bundleApplied: seededRandom() > 0.2,
        bundleCompliance: Math.floor(seededRandom() * 40) + 60,
        hasDevice,
        deviceType,
        deviceSite: site,
        deviceInsertionDate: hasDevice ? new Date(Date.now() - insertionDays * 24 * 60 * 60 * 1000).toLocaleDateString() : null,
        deviceDays: insertionDays,
        deviceRemoved: hasDevice ? seededRandom() > 0.8 : false,
        deviceRemovalDate: null,
        femoralAlarm: isFemoralOver7Days,
        clabsiRisk: deviceType === 'Central Line' || deviceType === 'PICC Line',
        cautiRisk: deviceType === 'Foley Catheter',
        vapRisk: deviceType === 'Ventilator',
      });
    } else {
      patients.push({
        id: `${department}-${i}`,
        bed: i,
        empty: true,
        isolation: 'None',
      });
    }
  }
  return patients;
};

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

const OUTBREAKS = [
  { id: 1, area: 'ICU Bay 1', organism: 'MRSA', class: 'B', cases: 3, startDate: '2024-01-10', status: 'Active' },
  { id: 2, area: 'ICU Bay 2', organism: 'C. diff', class: 'A', cases: 2, startDate: '2024-01-12', status: 'Under Investigation' },
];

export default function Home() {
  const [showLabs, setShowLabs] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(HOSPITALS[0]);
  const [selectedDepartment, setSelectedDepartment] = useState(DEPARTMENTS[0]);
  const [patients, setPatients] = useState([]);
  const [rates, setRates] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

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

  const occupiedPatients = patients.filter(p => !p.empty);
  const totalPatients = occupiedPatients.length;
  const patientsWithDevices = occupiedPatients.filter(p => p.hasDevice).length;
  const screeningNotDone = occupiedPatients.filter(p => !p.screeningDone);
  const cultureNotDone = occupiedPatients.filter(p => !p.cultureDone);
  const bundleNotApplied = occupiedPatients.filter(p => !p.bundleApplied);
  const femoralAlerts = occupiedPatients.filter(p => p.femoralAlarm);
  const totalDeviceDays = occupiedPatients.reduce((sum, p) => sum + (p.deviceDays || 0), 0);
  const totalPatientDays = occupiedPatients.reduce((sum, p) => sum + (p.patientDays || 0), 0);

  const ipccScore = 85 + (selectedHospital.id * 2) % 15;
  const bicslScore = 88 + (selectedDepartment.id.charCodeAt(0)) % 12;
  const handHygieneCompliance = 90 + (selectedHospital.id + selectedDepartment.id.charCodeAt(0)) % 10;
  const cleaningCompliance = 92 + (selectedHospital.id * 3) % 8;

  const theme = {
    bg: isDarkMode ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gray-50',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-600',
  };

  if (!isClient) {
    return (
      <div className={`min-h-screen ${theme.bg} flex items-center justify-center`}>
        <div className="text-center">
          <div className={`text-2xl ${theme.text} font-bold`}>ICU Infection Control Dashboard</div>
          <div className={theme.textMuted + " mt-2"}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.bg}`}>
      <Header 
        selectedHospital={selectedHospital}
        hospitals={HOSPITALS}
        onHospitalChange={setSelectedHospital}
        isDarkMode={isDarkMode}
        onThemeToggle={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Department Tabs with Labs */}
      <DepartmentTabs 
        departments={DEPARTMENTS}
        selected={selectedDepartment}
        onSelect={(dept) => { setSelectedDepartment(dept); setShowLabs(false); }}
        isDarkMode={isDarkMode}
        showLabs={true}
        onLabsClick={() => setShowLabs(true)}
        isLabsActive={showLabs}
      />

      {/* Labs Content */}
      {showLabs ? (
        <LabsTab isDarkMode={isDarkMode} />
      ) : (
        /* Dashboard Content */
        <main className="p-4 space-y-4">
          {/* Top Row - Key Metrics */}
          <div className="grid grid-cols-6 gap-3">
            <MetricCard label="Total Patients" value={totalPatients} color="blue" isDarkMode={isDarkMode} />
            <MetricCard label="On Devices" value={patientsWithDevices} color="purple" isDarkMode={isDarkMode} />
            <MetricCard label="Patient Days" value={totalPatientDays} color="cyan" isDarkMode={isDarkMode} />
            <MetricCard label="Device Days" value={totalDeviceDays} color="green" isDarkMode={isDarkMode} />
            <MetricCard label="Hand Hygiene" value={`${handHygieneCompliance}%`} color="yellow" isDarkMode={isDarkMode} />
            <MetricCard label="Femoral Alerts" value={femoralAlerts.length} color={femoralAlerts.length > 0 ? 'red' : 'green'} isDarkMode={isDarkMode} alert={femoralAlerts.length > 0} />
          </div>

          {/* Bed Isolation Overview */}
          <RoomOverview patients={patients} isDarkMode={isDarkMode} />

          {/* Second Row - Infection Rates & Scores */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8">
              {rates && <InfectionRates rates={rates} operations={SSI_OPERATIONS} isDarkMode={isDarkMode} />}
            </div>
            <div className="col-span-4">
              <ScoreCards 
                ipccScore={ipccScore}
                bicslScore={bicslScore}
                handHygiene={handHygieneCompliance}
                cleaning={cleaningCompliance}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>

          {/* Third Row - Outbreak & Compliance */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <OutbreakTracker outbreaks={OUTBREAKS} isDarkMode={isDarkMode} />
            </div>
            <div className="col-span-4">
              <ScreeningStatus 
                screeningNotDone={screeningNotDone}
                cultureNotDone={cultureNotDone}
                bundleNotApplied={bundleNotApplied}
                isDarkMode={isDarkMode}
              />
            </div>
            <div className="col-span-4">
              <DeviceAlerts alerts={femoralAlerts} allPatients={occupiedPatients} isDarkMode={isDarkMode} />
            </div>
          </div>

          {/* Fourth Row - Patient Table */}
          <PatientTable patients={occupiedPatients} department={selectedDepartment} isDarkMode={isDarkMode} />

          {/* Footer */}
          <footer className={`text-center py-2 ${theme.textMuted} text-sm`}>
            <p>Last Updated: {lastUpdate?.toLocaleTimeString() || '--:--:--'} | {selectedHospital.name} - {selectedDepartment.fullName}</p>
          </footer>
        </main>
      )}
    </div>
  );
}

// Metric Card Component
function MetricCard({ label, value, color, isDarkMode, alert }) {
  const colors = {
    blue: isDarkMode ? 'from-blue-600/20 to-blue-800/20 border-blue-500/30 text-blue-400' : 'from-blue-50 to-blue-100 border-blue-200 text-blue-600',
    purple: isDarkMode ? 'from-purple-600/20 to-purple-800/20 border-purple-500/30 text-purple-400' : 'from-purple-50 to-purple-100 border-purple-200 text-purple-600',
    cyan: isDarkMode ? 'from-cyan-600/20 to-cyan-800/20 border-cyan-500/30 text-cyan-400' : 'from-cyan-50 to-cyan-100 border-cyan-200 text-cyan-600',
    green: isDarkMode ? 'from-green-600/20 to-green-800/20 border-green-500/30 text-green-400' : 'from-green-50 to-green-100 border-green-200 text-green-600',
    yellow: isDarkMode ? 'from-yellow-600/20 to-yellow-800/20 border-yellow-500/30 text-yellow-400' : 'from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-600',
    red: isDarkMode ? 'from-red-600/30 to-red-800/30 border-red-500 text-red-400' : 'from-red-50 to-red-100 border-red-300 text-red-600',
  };
  
  return (
    <div className={`bg-gradient-to-br ${colors[color]} border-2 rounded-xl p-4 text-center ${alert ? 'animate-pulse' : ''}`}>
      <div className={`text-4xl font-bold ${colors[color].split(' ').pop()}`}>{value}</div>
      <div className={isDarkMode ? 'text-sm text-gray-400' : 'text-sm text-gray-600'}>{label}</div>
    </div>
  );
}
