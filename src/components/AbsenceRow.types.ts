import { Absence } from '../services/api.types';

export interface AbsenceRowProps {
  absence: Absence;
  onEmployeeClick: (employeeId: string) => void;
}