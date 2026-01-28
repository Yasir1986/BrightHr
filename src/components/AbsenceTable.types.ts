import { Absence } from '../services/api.types';

export interface AbsenceTableProps {
  data: Absence[];
  onEmployeeSelect: (id: string) => void;
}