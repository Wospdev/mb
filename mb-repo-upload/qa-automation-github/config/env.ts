import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Loads environment variables from .env file.
 * Call this early in config files (e.g. playwright.config.ts).
 */
export function loadEnvConfig(): void {
  const envPath = path.resolve(__dirname, '..', '.env');
  dotenv.config({ path: envPath });
}
