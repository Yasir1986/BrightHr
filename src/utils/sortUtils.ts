import { Absence } from '../services/api.types';
import { SortConfig } from './sortUtils.types';

export const sortAbsences = (absences: Absence[], config: SortConfig): Absence[] => {
  const sorted = [...absences];

  sorted.sort((a, b) => {
    let comparison = 0;

    switch (config.field) {
      case 'startDate':
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();
        comparison = dateA - dateB;
        break;
      case 'endDate':
        const getEndTime = (start: string, days: number) => {
          const d = new Date(start);
          d.setDate(d.getDate() + (days > 0 ? days - 1 : 0));
          return d.getTime();
        };
        comparison = getEndTime(a.startDate, a.days) - getEndTime(b.startDate, b.days);
        break;
      case 'absenceType':
        comparison = a.absenceType.localeCompare(b.absenceType);
        break;
      case 'name':
        const nameA = `${a.employee.lastName} ${a.employee.firstName}`.toLowerCase();
        const nameB = `${b.employee.lastName} ${b.employee.firstName}`.toLowerCase();
        comparison = nameA.localeCompare(nameB);
        break;
      default:
        comparison = 0;
    }

    return config.direction === 'asc' ? comparison : -comparison;
  });

  return sorted;
};