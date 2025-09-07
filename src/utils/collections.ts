export function single<T>(rows: T[]): T | null {
  if (rows.length === 0) return null;
  if (rows.length > 1) throw new Error("Expected single row, found multiple!");
  return rows[0];
}