import React, { useState, useMemo } from 'react';
import { AbsenceTableProps } from './AbsenceTable.types';
import { sortAbsences } from '../../utils/sortUtils';
import { SortConfig, SortField } from '../../utils/sortUtils.types';
import AbsenceRow from '../AbsenceRow/AbsenceRow';

const AbsenceTable: React.FC<AbsenceTableProps> = ({ data, onEmployeeSelect }) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'startDate',
    direction: 'asc',
  });

  const handleSort = (field: SortField) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedData = useMemo(() => sortAbsences(data, sortConfig), [data, sortConfig]);

  const SortIcon: React.FC<{ field: SortField }> = ({ field }) => {
    if (sortConfig.field !== field) return null;
    return sortConfig.direction === 'asc' ? <span>▲</span> : <span>▼</span>;
  };

  return (
    <div className="bg-white shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['name', 'absenceType', 'startDate', 'endDate'].map(key => (
                <th
                  key={key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:bg-gray-100"
                  onClick={() => handleSort(key as SortField)}
                >
                  {key === 'name' ? 'Employee' : key === 'absenceType' ? 'Type' : key === 'startDate' ? 'Start Date' : 'End Date'} <SortIcon field={key as SortField} />
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conflicts</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map(abs => (
              <AbsenceRow key={abs.id} absence={abs} onEmployeeClick={onEmployeeSelect} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{sortedData.length}</span> records
        </div>
      </div>
    </div>
  );
};

export default AbsenceTable;
