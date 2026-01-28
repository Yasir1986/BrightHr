import { AbsenceType } from "../services/api.types";
import { sortAbsences } from "./sortUtils";

const mockAbsences = [
  {
    id: 1,
    startDate: "2026-02-01",
    days: 5,
    absenceType: "ANNUAL_LEAVE" as AbsenceType,
    employee: { id: "e1", firstName: "Charlie", lastName: "Adams" },
    approved: true,
  },
  {
    id: 2,
    startDate: "2026-01-28",
    days: 3,
    absenceType: "SICKNESS" as AbsenceType,
    employee: { id: "e2", firstName: "Alice", lastName: "Brown" },
    approved: false,
  },
];

describe("sortAbsences", () => {
  test("sorts by startDate ascending", () => {
    const result = sortAbsences(mockAbsences, {
      field: "startDate",
      direction: "asc",
    });
    expect(result[0].id).toBe(2);
  });

  test("sorts by name ascending", () => {
    const result = sortAbsences(mockAbsences, {
      field: "name",
      direction: "asc",
    });
    expect(result[0].employee.lastName).toBe("Adams");
  });

  test("returns new array without mutating original", () => {
    const original = [...mockAbsences];
    const result = sortAbsences(mockAbsences, {
      field: "startDate",
      direction: "asc",
    });
    expect(result).not.toBe(mockAbsences);
    expect(mockAbsences).toEqual(original);
  });
});
