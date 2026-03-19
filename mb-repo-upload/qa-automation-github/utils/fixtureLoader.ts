import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Load JSON fixture by name. No hard-coded assertions - all data from fixtures.
 */
export function loadFixture<T>(name: string): T {
  const fixturePath = path.resolve(__dirname, '..', 'fixtures', `${name}.json`);
  const content = readFileSync(fixturePath, 'utf-8');
  return JSON.parse(content) as T;
}
