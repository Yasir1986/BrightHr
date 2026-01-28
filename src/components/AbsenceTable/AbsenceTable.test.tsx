import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AbsenceTable from "./AbsenceTable";
import { Absence, AbsenceType } from "../../services/api.types";

jest.mock("../AbsenceRow/AbsenceRow", () => {
  const MockAbsenceRow = jest.fn(({ absence, onEmployeeClick }) => (
    <tr data-testid={`absence-row-${absence.id}`}>
      <td onClick={() => onEmployeeClick(absence.employee.id)}>
        {absence.employee.firstName} {absence.employee.lastName}
      </td>
      <td>{absence.absenceType}</td>
      <td>{absence.startDate}</td>
      <td>{absence.days}</td>
    </tr>
  ));
  return MockAbsenceRow;
});

jest.mock("../../utils/sortUtils", () => ({
  sortAbsences: jest.fn((data: Absence[], sortConfig?: any) => {
    return [...data];
  }),
}));

const mockAbsences: Absence[] = [
  {
    id: 1,
    startDate: "2026-02-01",
    days: 5,
    absenceType: "ANNUAL_LEAVE" as AbsenceType,
    employee: {
      id: "e1",
      firstName: "Alice",
      lastName: "Smith",
    },
    approved: true,
  },
  {
    id: 2,
    startDate: "2026-01-28",
    days: 3,
    absenceType: "SICKNESS" as AbsenceType,
    employee: {
      id: "e2",
      firstName: "Bob",
      lastName: "Johnson",
    },
    approved: false,
  },
  {
    id: 3,
    startDate: "2026-02-15",
    days: 2,
    absenceType: "MEDICAL" as AbsenceType,
    employee: {
      id: "e3",
      firstName: "Carol",
      lastName: "Williams",
    },
    approved: true,
  },
];

const mockSortAbsences = require("../../utils/sortUtils").sortAbsences;

describe("AbsenceTable", () => {
  const mockOnEmployeeSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockSortAbsences.mockImplementation((data: Absence[]) => [...data]);
  });

  it("renders the table with headers", () => {
    render(
      <AbsenceTable
        data={mockAbsences}
        onEmployeeSelect={mockOnEmployeeSelect}
      />,
    );

    expect(screen.getByText("Employee")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByText("End Date")).toBeInTheDocument();
    expect(screen.getByText("Days")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Conflicts")).toBeInTheDocument();
  });

  it("renders the correct number of absence rows", () => {
    render(
      <AbsenceTable
        data={mockAbsences}
        onEmployeeSelect={mockOnEmployeeSelect}
      />,
    );

    expect(screen.getByTestId("absence-row-1")).toBeInTheDocument();
    expect(screen.getByTestId("absence-row-2")).toBeInTheDocument();
    expect(screen.getByTestId("absence-row-3")).toBeInTheDocument();
  });

  it("calls sort function when header is clicked", () => {
    render(
      <AbsenceTable
        data={mockAbsences}
        onEmployeeSelect={mockOnEmployeeSelect}
      />,
    );

    fireEvent.click(screen.getByText("Employee"));
    expect(mockSortAbsences).toHaveBeenCalled();
  });

  it("changes sort field when clicking different headers", () => {
    render(
      <AbsenceTable
        data={mockAbsences}
        onEmployeeSelect={mockOnEmployeeSelect}
      />,
    );

    fireEvent.click(screen.getByText("Type"));
    expect(mockSortAbsences).toHaveBeenLastCalledWith(mockAbsences, {
      field: "absenceType",
      direction: "asc",
    });
    mockSortAbsences.mockClear();
    fireEvent.click(screen.getByText("End Date"));
    expect(mockSortAbsences).toHaveBeenLastCalledWith(mockAbsences, {
      field: "endDate",
      direction: "asc",
    });
  });

  it("shows sort indicators when sorting", () => {
    render(
      <AbsenceTable
        data={mockAbsences}
        onEmployeeSelect={mockOnEmployeeSelect}
      />,
    );
    expect(screen.getByText("▲")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Employee"));
    expect(screen.getByText("▲")).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    render(
      <AbsenceTable
        data={mockAbsences}
        onEmployeeSelect={mockOnEmployeeSelect}
      />,
    );
    const table = screen.getByRole("table");

    const container = table.closest("div")?.parentElement;
    expect(table).toHaveClass("min-w-full", "divide-y", "divide-gray-200");

    const containerDiv = screen.getByText("Employee").closest("div.bg-white");
    expect(containerDiv).toHaveClass(
      "bg-white",
      "shadow",
      "overflow-hidden",
      "border-b",
      "border-gray-200",
      "sm:rounded-lg",
      "mt-6",
    );
  });

  it("shows correct header text formatting", () => {
    render(
      <AbsenceTable
        data={mockAbsences}
        onEmployeeSelect={mockOnEmployeeSelect}
      />,
    );

    expect(screen.getByText("Employee")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByText("End Date")).toBeInTheDocument();
  });

  it("has clickable sort headers", () => {
    render(
      <AbsenceTable
        data={mockAbsences}
        onEmployeeSelect={mockOnEmployeeSelect}
      />,
    );

    const employeeHeader = screen.getByText("Employee");
    expect(employeeHeader.closest("th")).toHaveClass("cursor-pointer");
  });
});
