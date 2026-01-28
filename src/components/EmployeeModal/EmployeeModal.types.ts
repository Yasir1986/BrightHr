import { Absence } from '../../services/api.types';

export interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeeId: string | null;
  allAbsences: Absence[];
}
