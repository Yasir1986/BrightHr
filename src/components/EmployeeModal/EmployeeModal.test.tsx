import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmployeeModal from './EmployeeModal';
import { Absence } from '../../services/api.types';


jest.mock('../../utils/dateUtils', () => ({
  formatDate: jest.fn((date: string) => date),
  calculateEndDate: jest.fn((startDate: string, days: number) => {
    // Return a different string for end date to avoid duplicate text issues
    return `${startDate}-end`;
  }),
}));

const mockAbsences: Absence[] = [
  {
    id: 1,
    startDate: '2026-01-01',
    days: 3,
    absenceType: 'SICKNESS',
    employee: { id: 'e1', firstName: 'Alice', lastName: 'Smith' },
    approved: true,
  },
  {
    id: 2,
    startDate: '2026-02-01',
    days: 2,
    absenceType: 'ANNUAL_LEAVE',
    employee: { id: 'e2', firstName: 'Bob', lastName: 'Johnson' },
    approved: false,
  },
];

describe('EmployeeModal', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when isOpen is false', () => {
    render(
      <EmployeeModal
        isOpen={false}
        onClose={onClose}
        employeeId="e1"
        allAbsences={mockAbsences}
      />
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders modal with employee absence history', () => {
    render(
      <EmployeeModal
        isOpen={true}
        onClose={onClose}
        employeeId="e1"
        allAbsences={mockAbsences}
      />
    );

    expect(screen.getByText('Absence History: Alice Smith')).toBeInTheDocument();

    const row = screen.getByText('SICKNESS').closest('tr');
    expect(row).toBeInTheDocument();
    expect(within(row!).getByText('2026-01-01')).toBeInTheDocument();
    expect(within(row!).getByText('2026-01-01-end')).toBeInTheDocument();
    expect(within(row!).getByText('Approved')).toBeInTheDocument();
    expect(screen.queryByText('ANNUAL_LEAVE')).not.toBeInTheDocument();
  });

  it('renders "No absence records found" when employee has no absences', () => {
    render(
      <EmployeeModal
        isOpen={true}
        onClose={onClose}
        employeeId="nonexistent"
        allAbsences={mockAbsences}
      />
    );
    expect(screen.getByText('No absence records found.')).toBeInTheDocument();
  });

  it('calls onClose when clicking the overlay or Close button', () => {
    render(
      <EmployeeModal
        isOpen={true}
        onClose={onClose}
        employeeId="e1"
        allAbsences={mockAbsences}
      />
    );

    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);

    const overlay = screen.getByRole('dialog');
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
