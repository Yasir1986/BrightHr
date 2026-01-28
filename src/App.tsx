import React, { useState } from 'react';
import AbsenceTable from './components/AbsenceTable';
import DashboardStats from './components/DashboardStats';
import { useAbsences } from './hooks/useAbsences';

const App: React.FC = () => {
  const { absences, loading, error } = useAbsences();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

  const handleEmployeeSelect = (id: string) => {
    setSelectedEmployeeId(id);
  };

  const handleCloseModal = () => {
    setSelectedEmployeeId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <header className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Absence Manager
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          View and manage employee absences and detect scheduling conflicts.
        </p>
      </header>

      <main className="max-w-7xl mx-auto">
        
        
        {!loading && !error && (
          <>
            <DashboardStats absences={absences} />
            <AbsenceTable 
              data={absences} 
              onEmployeeSelect={handleEmployeeSelect} 
            />
          </>
        )}
      </main>

     
    </div>
  );
};

export default App;