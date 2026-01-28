export type SortField = 'startDate' | 'endDate' | 'absenceType' | 'name';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}