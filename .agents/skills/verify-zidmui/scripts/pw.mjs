// Resolve Playwright without adding it to package.json: the repo's node_modules, then
// $PLAYWRIGHT_DIR, then the global npm root, then the Homebrew global root.
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const globalRoot = () => {
  try {
    return path.join(execSync('npm root -g', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(), 'playwright');
  } catch {
    return null;
  }
};
const candidates = ['playwright', process.env.PLAYWRIGHT_DIR, globalRoot(), '/opt/homebrew/lib/node_modules/playwright', '/usr/local/lib/node_modules/playwright'];
let pw = null;
for (const c of candidates) {
  if (!c || (c !== 'playwright' && !existsSync(c))) continue;
  try {
    pw = require(c);
    break;
  } catch {}
}
if (!pw) {
  console.error('TOOL playwright not found: npm i -g playwright && npx playwright install chromium, or set PLAYWRIGHT_DIR');
  process.exit(3);
}
export const playwright = pw;
