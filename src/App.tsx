import React, { useState } from "react";
import AbsenceTable from "./components/AbsenceTable/AbsenceTable";
import EmployeeModal from "./components/EmployeeModal/EmployeeModal";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorDisplay from "./components/ErrorDisplay";
import DashboardStats from "./components/DashboardStats/DashboardStats";
import { useAbsences } from "./hooks/useAbsences";

const App: React.FC = () => {
  const { absences, loading, error } = useAbsences();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null,
  );

  const handleEmployeeSelect = (id: string) => {
    setSelectedEmployeeId(id);
  };

  const handleCloseModal = () => {
    setSelectedEmployeeId(null);
  };

  const handleBackToDashboard = () => {
    // an add navigation logic here if needed
    // For now, just scroll to top or reload the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleBackToDashboard}
          >
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              BrightHR{" "}
              <span className="text-slate-500 font-normal ">Absences</span>
            </h1>
          </div>
          <div className="text-sm text-slate-500">Senior FE Task</div>
        </div>
      </header>
      <main className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Absence Manager
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              View and manage employee absences and detect scheduling conflicts.
            </p>
          </div>

          {loading && <LoadingSpinner />}

          {error && <ErrorDisplay message={error} />}

          {!loading && !error && (
            <>
              <DashboardStats absences={absences} />
              <AbsenceTable
                data={absences}
                onEmployeeSelect={handleEmployeeSelect}
              />
            </>
          )}
        </div>
      </main>

      <EmployeeModal
        isOpen={!!selectedEmployeeId}
        onClose={handleCloseModal}
        employeeId={selectedEmployeeId}
        allAbsences={absences}
      />
    </div>
  );
};

export default App;
