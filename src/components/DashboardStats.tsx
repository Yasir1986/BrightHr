import React, { useMemo } from 'react';
import { DashboardStatsProps } from './DashboardStats.types';

const DashboardStats: React.FC<DashboardStatsProps> = ({ absences }) => {
  const { total, approved, pending } = useMemo(() => {
    const totalCount = absences.length;
    const approvedCount = absences.filter((a) => a.approved).length;
    const pendingCount = totalCount - approvedCount;
    return {
      total: totalCount,
      approved: approvedCount,
      pending: pendingCount
    };
  }, [absences]);

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-6">
      <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-blue-500">
        <div className="px-4 py-5 sm:p-6 flex items-center">
          <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div className="ml-5 w-0 flex-1">
            <p className="text-sm font-medium text-gray-500 truncate">Total Absences</p>
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{total}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-green-500">
        <div className="px-4 py-5 sm:p-6 flex items-center">
          <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-5 w-0 flex-1">
            <p className="text-sm font-medium text-gray-500 truncate">Approved</p>
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{approved}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-yellow-500">
        <div className="px-4 py-5 sm:p-6 flex items-center">
          <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
            <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-5 w-0 flex-1">
            <p className="text-sm font-medium text-gray-500 truncate">Pending Approval</p>
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{pending}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;