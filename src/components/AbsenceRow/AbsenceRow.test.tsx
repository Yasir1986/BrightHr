import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AbsenceRow from "./AbsenceRow";
import { Absence, AbsenceType } from "../../services/api.types";

const mockAbsence: Absence = {
  id: 2,
  startDate: "2026-01-28",
  days: 3,
  absenceType: "SICKNESS" as AbsenceType,
  employee: {
    id: "e1",
    firstName: "John",
    lastName: "Doe",
  },
  approved: true,
};

jest.mock("../../services/api", () => ({
  checkConflict: jest.fn().mockResolvedValue(true),
}));

describe("AbsenceRow", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders absence details correctly", async () => {
    render(
      <table>
        <tbody>
          <AbsenceRow absence={mockAbsence} onEmployeeClick={() => {}} />
        </tbody>
      </table>,
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("SICKNESS")).toBeInTheDocument();
    expect(
      screen.getByText(/1\/28\/2026|28\/1\/2026|28\/01\/2026/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/1\/30\/2026|30\/1\/2026|30\/01\/2026/),
    ).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("Approved")).toBeInTheDocument();
    expect(screen.getByText("Checking...")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Conflict")).toBeInTheDocument();
    });
  });

  it("calls onEmployeeClick when employee name is clicked", async () => {
    const onClick = jest.fn();

    render(
      <table>
        <tbody>
          <AbsenceRow absence={mockAbsence} onEmployeeClick={onClick} />
        </tbody>
      </table>,
    );
    await waitFor(() => {
      expect(screen.getByText("Conflict")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText("John Doe"));
    expect(onClick).toHaveBeenCalledWith("e1");
  });

  it('shows "No" when there is no conflict', async () => {
    const { checkConflict } = require("../../services/api");
    checkConflict.mockResolvedValue(false);

    render(
      <table>
        <tbody>
          <AbsenceRow absence={mockAbsence} onEmployeeClick={() => {}} />
        </tbody>
      </table>,
    );
    await waitFor(() => {
      expect(screen.getByText("No")).toBeInTheDocument();
    });
  });

  it('shows "Pending" when absence is not approved', async () => {
    const pendingAbsence = {
      ...mockAbsence,
      approved: false,
    };

    render(
      <table>
        <tbody>
          <AbsenceRow absence={pendingAbsence} onEmployeeClick={() => {}} />
        </tbody>
      </table>,
    );
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });
});
