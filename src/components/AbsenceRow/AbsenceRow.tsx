import React, { useEffect, useState } from 'react';
import { Absence } from '../../services/api.types';
import { checkConflict } from '../../services/api';

interface AbsenceRowProps {
  absence: Absence;
  onEmployeeClick: (id: string) => void;
}

const AbsenceRow: React.FC<AbsenceRowProps> = ({ absence, onEmployeeClick }) => {
  const [hasConflict, setHasConflict] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;
    checkConflict(absence.id)
      .then(conflicts => {
        if (isMounted) setHasConflict(conflicts);
      })
      .catch(() => {
        if (isMounted) setHasConflict(false);
      });
    return () => { isMounted = false; };
  }, [absence.id]);

  const endDate = new Date(absence.startDate);
  endDate.setDate(endDate.getDate() + (absence.days > 0 ? absence.days - 1 : 0));

  return (
    <tr className={hasConflict ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-50'}>
      <td
        className="px-6 py-3 text-sm text-blue-600 font-medium cursor-pointer hover:underline"
        onClick={() => onEmployeeClick(absence.employee.id)}
      >
        {absence.employee.firstName} {absence.employee.lastName}
      </td>
      <td className="px-6 py-3 text-sm text-gray-700">{absence.absenceType.replace('_', ' ')}</td>
      <td className="px-6 py-3 text-sm text-gray-700">{new Date(absence.startDate).toLocaleDateString()}</td>
      <td className="px-6 py-3 text-sm text-gray-700">{endDate.toLocaleDateString()}</td>
      <td className="px-6 py-3 text-sm text-gray-700">{absence.days}</td>
      <td className="px-6 py-3">
        {absence.approved ? (
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
            Approved
          </span>
        ) : (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded">
            Pending
          </span>
        )}
      </td>
      <td className="px-6 py-3 text-sm">
        {hasConflict === null ? (
          <span className="text-gray-400">Checking...</span>
        ) : hasConflict ? (
          <span className="text-red-700 font-bold">Conflict</span>
        ) : (
          <span className="text-green-700">No</span>
        )}
      </td>
    </tr>
  );
};

export default AbsenceRow;
