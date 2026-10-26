/**
 * @module scripts/check-architecture
 * @meta Keeps module documentation and the shared slide-heading boundary consistent in CI.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const sourceRoot = fileURLToPath(new URL('../src/', import.meta.url));

function collectModules(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return collectModules(path);
    return /\.tsx?$/.test(entry.name) ? [path] : [];
  });
}

const modules = collectModules(sourceRoot).sort();
const errors: string[] = [];
for (const path of modules) {
  const file = relative(sourceRoot, path).replaceAll('\\', '/');
  const source = readFileSync(path, 'utf8');
  const header = source.match(/^\/\*\*[\s\S]*?\*\//)?.[0] ?? '';
  if (!/@module\s+\S+/.test(header) || !/@meta\s+\S+/.test(header)) {
    errors.push(`${file}: add a concise JSDoc @module / @meta header.`);
  }
  if (
    /^slides\/[^/]+-slide\.tsx$/.test(file) &&
    /from\s+['"][^'"]*\/(?:kicker|animated-title)['"]/.test(source)
  ) {
    errors.push(
      `${file}: compose the headline with SlideHeading; chapter metadata belongs in content/slides.ts.`,
    );
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Architecture checks passed (${modules.length} TypeScript modules).`);
}
