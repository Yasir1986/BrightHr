import { useState, useEffect } from 'react';
import { checkConflict } from '../services/api';

export const useConflicts = (absenceId: number) => {
  const [hasConflict, setHasConflict] = useState<boolean>(false);
  const [checking, setChecking] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    const verifyConflict = async () => {
      try {
        const conflictStatus = await checkConflict(absenceId);
        if (mounted) {
          setHasConflict(conflictStatus);
        }
      } catch (error) {
        console.error(`Error checking conflict for ID ${absenceId}`, error);
      } finally {
        if (mounted) {
          setChecking(false);
        }
      }
    };

    verifyConflict();

    return () => {
      mounted = false;
    };
  }, [absenceId]);

  return { hasConflict, checking };
};