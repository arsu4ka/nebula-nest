export function generateRandomHex(length: number): string {
  const characters = '0123456789ABCDEF';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

export function buildQueryString(query: Record<string, string>): string {
  return Object.entries(query)
    .map(([key, value]) =>
      key && value ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}` : '',
    )
    .join('&');
}
