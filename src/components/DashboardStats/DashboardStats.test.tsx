import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import DashboardStats from "./DashboardStats";
import { Absence } from "../../services/api.types";

const mockAbsences: Absence[] = [
  {
    id: 1,
    approved: true,
    startDate: "2026-01-01",
    days: 3,
    absenceType: "SICKNESS",
    employee: { id: "e1", firstName: "Alice", lastName: "Smith" },
  },
  {
    id: 2,
    approved: false,
    startDate: "2026-01-02",
    days: 2,
    absenceType: "ANNUAL_LEAVE",
    employee: { id: "e2", firstName: "Bob", lastName: "Johnson" },
  },
  {
    id: 3,
    approved: true,
    startDate: "2026-01-03",
    days: 1,
    absenceType: "MEDICAL",
    employee: { id: "e3", firstName: "Carol", lastName: "Williams" },
  },
];

describe("DashboardStats", () => {
  it("renders total, approved, and pending counts correctly", () => {
    render(<DashboardStats absences={mockAbsences} />);

    expect(screen.getByText("Total Absences")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument(); // total

    expect(screen.getByText("Approved")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument(); // approved

    expect(screen.getByText("Pending Approval")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument(); // pending
  });

  it("renders correctly with empty absences", () => {
    render(<DashboardStats absences={[]} />);

    const totalCard = screen.getByText("Total Absences").closest("div");
    expect(within(totalCard!).getByText("0")).toBeInTheDocument();

    const approvedCard = screen.getByText("Approved").closest("div");
    expect(within(approvedCard!).getByText("0")).toBeInTheDocument();

    const pendingCard = screen.getByText("Pending Approval").closest("div");
    expect(within(pendingCard!).getByText("0")).toBeInTheDocument();
  });
});
