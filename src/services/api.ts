import { Absence, ConflictResponse } from './api.types';

const BASE_URL = 'https://front-end-kata.brighthr.workers.dev/api';

export const fetchAbsences = async (): Promise<Absence[]> => {
  const res = await fetch(`${BASE_URL}/absences`);
  if (!res.ok) throw new Error('Failed to fetch absences');
  return res.json();
};

export const checkConflict = async (id: number): Promise<boolean> => {
  const res = await fetch(`${BASE_URL}/conflict/${id}`);
  if (!res.ok) throw new Error('Failed to check conflicts');
  const data: ConflictResponse = await res.json();
  return data.conflicts;
};
