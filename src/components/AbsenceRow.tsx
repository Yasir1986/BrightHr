import React from 'react';
import { useConflicts } from '../hooks/useConflicts';
import { formatDate, calculateEndDate } from '../utils/dateUtils';
import { AbsenceRowProps } from './AbsenceRow.types';

const AbsenceRow: React.FC<AbsenceRowProps> = ({ absence, onEmployeeClick }) => {
  const { hasConflict, checking } = useConflicts(absence.id);

  const getStatusBadge = (approved: boolean) => {
    if (approved) {
      return (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Approved
        </span>
      );
    }
    return (
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
        Pending
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      SICKNESS: 'bg-red-100 text-red-800',
      ANNUAL_LEAVE: 'bg-blue-100 text-blue-800',
      MEDICAL: 'bg-purple-100 text-purple-800',
    };
    const defaultColor = 'bg-gray-100 text-gray-800';
    
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[type] || defaultColor}`}>
        {type.replace('_', ' ')}
      </span>
    );
  };

  return (
    <tr className={`hover:bg-gray-50 transition-colors duration-150 ${hasConflict ? 'bg-red-50/50' : ''}`}>
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          onClick={() => onEmployeeClick(absence.employee.id)}
          className="text-sm font-medium text-blue-600 hover:text-blue-900 hover:underline focus:outline-none"
        >
          {absence.employee.firstName} {absence.employee.lastName}
        </button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {getTypeBadge(absence.absenceType)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(absence.startDate)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {calculateEndDate(absence.startDate, absence.days)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {absence.days}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {getStatusBadge(absence.approved)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {checking ? (
           <span className="text-gray-400 text-xs">Checking...</span>
        ) : hasConflict ? (
          <div className="flex items-center text-red-600" title="This absence conflicts with another record">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-medium text-xs">Conflict</span>
          </div>
        ) : (
          <div className="flex items-center text-green-500">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
             </svg>
          </div>
        )}
      </td>
    </tr>
  );
};

export default AbsenceRow;