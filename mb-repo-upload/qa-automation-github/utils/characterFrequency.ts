/**
 * Counts character occurrences in a string and outputs them in order of first appearance.
 *
 * Assumptions:
 * - Case-sensitive: 'A' and 'a' are counted separately
 * - Whitespace is excluded from output (spaces, tabs, newlines are skipped)
 * - Special characters and punctuation are included
 * - Unicode/emoji characters are supported (each code point counted)
 * - Empty string returns empty string
 *
 * @param input - The string to analyze
 * @returns Comma-separated "char:count" pairs in order of first appearance
 */
export function characterFrequency(input: string): string {
  if (input.length === 0) return '';

  const map = new Map<string, number>();
  for (const char of input) {
    if (/\s/.test(char)) continue;
    map.set(char, (map.get(char) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([char, count]) => `${char}:${count}`)
    .join(', ');
}
