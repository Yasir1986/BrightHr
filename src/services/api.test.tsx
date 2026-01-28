import { fetchAbsences, checkConflict } from "./api";

global.fetch = jest.fn();

describe("API Functions", () => {
  const mockAbsences = [
    {
      id: 1,
      startDate: "2026-01-28",
      days: 3,
      absenceType: "SICKNESS",
      employee: { id: "e1", firstName: "John", lastName: "Doe" },
      approved: true,
    },
  ];

  const mockConflictResponse = { conflicts: true };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchAbsences", () => {
    it("should fetch absences successfully", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockAbsences),
      });

      const result = await fetchAbsences();

      expect(fetch).toHaveBeenCalledWith(
        "https://front-end-kata.brighthr.workers.dev/api/absences",
      );
      expect(result).toEqual(mockAbsences);
    });

    it("should throw an error when fetch fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(fetchAbsences()).rejects.toThrow("Failed to fetch absences");
    });

    it("should throw an error on network failure", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      await expect(fetchAbsences()).rejects.toThrow("Network error");
    });
  });

  describe("checkConflict", () => {
    it("should check conflict successfully", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockConflictResponse),
      });

      const result = await checkConflict(1);

      expect(fetch).toHaveBeenCalledWith(
        "https://front-end-kata.brighthr.workers.dev/api/conflict/1",
      );
      expect(result).toBe(true);
    });

    it("should return false when no conflicts", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ conflicts: false }),
      });

      const result = await checkConflict(2);
      expect(result).toBe(false);
    });

    it("should throw an error when fetch fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(checkConflict(1)).rejects.toThrow(
        "Failed to check conflicts",
      );
    });

    it("should handle different absence IDs", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockConflictResponse),
      });

      const result = await checkConflict(123);

      expect(fetch).toHaveBeenCalledWith(
        "https://front-end-kata.brighthr.workers.dev/api/conflict/123",
      );
      expect(result).toBe(true);
    });
  });
});
