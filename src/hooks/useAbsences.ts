import { useState, useEffect } from 'react';
import { fetchAbsences } from '../services/api';
import { Absence } from '../services/api.types';

export const useAbsences = () => {
  const [absences, setAbsences] = useState<Absence[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchAbsences();
        setAbsences(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { absences, loading, error };
};