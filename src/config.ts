import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

export function loadEnvFile(appPath: string): void {
  const candidates = [
    path.join(process.cwd(), '.env'),
    path.join(appPath, '.env'),
    path.join(path.dirname(process.execPath), '.env'),
  ];

  for (const filePath of candidates) {
    if (!existsSync(filePath)) continue;

    const content = readFileSync(filePath, 'utf8');
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      const separatorIndex = trimmed.indexOf('=');
      if (separatorIndex === -1) continue;

      const key = trimmed.slice(0, separatorIndex).trim();
      const rawValue = trimmed.slice(separatorIndex + 1).trim();
      const value = rawValue.replace(/^['"]|['"]$/g, '');

      if (key && process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  }
}
