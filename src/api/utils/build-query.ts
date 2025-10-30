/**
 * Безопасно строит query-строку из параметров
 */
export const buildQuery = (params: Record<string, any> = {}): string => {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value == null) continue;

    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed === '') continue;
      searchParams.append(key, trimmed);
      continue;
    }

    if (typeof value === 'number') {
      searchParams.append(key, value.toString());
      continue;
    }

    searchParams.append(key, String(value));
  }

  return searchParams.toString();
};