export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
}

export enum AbsenceType {
  SICKNESS = 'SICKNESS',
  ANNUAL_LEAVE = 'ANNUAL_LEAVE',
  MEDICAL = 'MEDICAL',
}

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