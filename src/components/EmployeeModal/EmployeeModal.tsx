import React, { useMemo } from 'react';
import { Absence } from '../../services/api.types';
import { formatDate, calculateEndDate } from '../../utils/dateUtils';
import { EmployeeModalProps } from './EmployeeModal.types';

const EmployeeModal: React.FC<EmployeeModalProps> = ({
  isOpen,
  onClose,
  employeeId,
  allAbsences
}) => {
  // Memoize filtered absences for selected employee
  const employeeAbsences = useMemo(() => {
    if (!employeeId) return [];
    return allAbsences
      .filter(abs => abs.employee?.id === employeeId)
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  }, [employeeId, allAbsences]);

  const employeeName = employeeAbsences.length > 0 && employeeAbsences[0].employee
    ? `${employeeAbsences[0].employee.firstName} ${employeeAbsences[0].employee.lastName}`
    : 'Employee';

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Absence History: {employeeName}
          </h2>
        </div>

        {/* Body */}
        <div className="p-6">
          {employeeAbsences.length === 0 ? (
            <p className="text-gray-500">No absence records found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {employeeAbsences.map(absence => (
                    <tr key={absence.id}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        {absence.absenceType.replace('_', ' ')}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(absence.startDate)}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {calculateEndDate(absence.startDate, absence.days)}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {absence.approved ? (
                          <span className="text-green-700 bg-green-100 px-2 py-1 rounded text-xs font-semibold">
                            Approved
                          </span>
                        ) : (
                          <span className="text-yellow-700 bg-yellow-100 px-2 py-1 rounded text-xs font-semibold">
                            Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
