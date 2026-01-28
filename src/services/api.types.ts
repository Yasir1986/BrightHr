export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
}

export type AbsenceType = 'SICKNESS' | 'ANNUAL_LEAVE' | 'MEDICAL';

export interface Absence {
  id: number;
  startDate: string;
  days: number;
  absenceType: AbsenceType;
  employee: Employee;
  approved: boolean;
}

export interface ConflictResponse {
  conflicts: boolean;
}
