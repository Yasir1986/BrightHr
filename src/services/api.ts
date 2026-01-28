import { Absence, ConflictResponse } from './api.types';

const BASE_URL = 'https://front-end-kata.brighthr.workers.dev/api';

export const fetchAbsences = async (): Promise<Absence[]> => {
  const response = await fetch(`${BASE_URL}/absences`);
  if (!response.ok) throw new Error('Failed to fetch absences');
  return response.json();
};

export const checkConflict = async (id: number): Promise<boolean> => {
  const response = await fetch(`${BASE_URL}/conflict/${id}`);
  if (!response.ok) throw new Error('Failed to check conflicts');
  const data: ConflictResponse = await response.json();
  return data.conflicts;
};
