/**
 * @module scripts/export-pdf
 * @meta Prints the full static deck through a temporary loopback preview, then closes both processes.
 */

import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import { chromium } from 'playwright';
import { preview } from 'vite';

const outputPath = resolve(process.argv[2] ?? 'output/pdf/zim-squad-joshua-philip.pdf');
const server = await preview({ preview: { host: '127.0.0.1', port: 0, open: false } });
let browser;
try {
  const address = server.httpServer.address();
  if (!address || typeof address === 'string') throw new Error('Preview did not bind a TCP port.');
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 },
    reducedMotion: 'reduce',
  });
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.emulateMedia({ media: 'print' });
  await page.goto(`http://127.0.0.1:${address.port}/?print`, { waitUntil: 'networkidle' });
  await page.locator('.print-page:last-child h1').waitFor();
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(Array.from(document.images, (image) => image.decode()));
    await new Promise<void>((done) =>
      requestAnimationFrame(() => requestAnimationFrame(() => done())),
    );
  });
  const expectedPages = Number(
    await page.locator('.print-deck').getAttribute('data-export-page-count'),
  );
  const actualPages = await page.locator('.print-page').count();
  if (actualPages !== expectedPages || errors.length) {
    throw new Error(
      `Export validation failed: ${actualPages}/${expectedPages} slides. ${errors.join('; ')}`,
    );
  }
  const fontsReady = await page.evaluate(
    () =>
      document.fonts.check('600 24px "Barlow Condensed"') &&
      document.fonts.check('400 16px "DM Sans"'),
  );
  if (!fontsReady) throw new Error('Presentation fonts did not load. Check the network and retry.');
  await mkdir(dirname(outputPath), { recursive: true });
  await page.pdf({
    path: outputPath,
    width: '1280px',
    height: '720px',
    printBackground: true,
    preferCSSPageSize: true,
    tagged: true,
    outline: true,
  });
  console.log(`Exported ${actualPages} slides with selectable text to ${outputPath}`);
} finally {
  await browser?.close();
  await new Promise<void>((done, reject) =>
    server.httpServer.close((error) => (error ? reject(error) : done())),
  );
}
