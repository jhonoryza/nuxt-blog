import { defineEventHandler, createError, sendError } from 'h3';
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

export default defineEventHandler(async (event) => {
  const isLocal = process.env.NODE_ENV !== 'production';

  // Chromium path untuk NixOS / local dev
  const localChromium =
    process.env.CHROMIUM_PATH || '/run/current-system/sw/bin/chromium';

  let browser = null;

  const c = chromium as any;

  try {
    browser = await puppeteer.launch({
      executablePath: isLocal
        ? localChromium                   // NixOS local
        : await c.executablePath(), // Vercel / serverless

      headless: c.headless,
      args: isLocal
        ? [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
          ]
        : c.args,

      defaultViewport: c.defaultViewport,
      protocolTimeout: 60000,
    });

    const page = await browser.newPage();

    // Avoid DNS / loopback confusion
    // const port = process.env.PORT || 3000;
    // const url = `http://127.0.0.1:${port}/cv?pdf=true`;

    const req = event.node.req;

    const protocol =
      req.headers['x-forwarded-proto']?.toString() ||
      'https';

    const host =
      req.headers['x-forwarded-host']?.toString() ||
      req.headers['host']?.toString();

    const url = `${protocol}://${host}/cv?pdf=true`;

    console.log("Generating PDF from:", url);

    await page.goto(url, {
      waitUntil: 'domcontentloaded', // lebih aman untuk Nuxt
      timeout: 60000,
    });

    await page.emulateMediaType('screen');

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px',
      },
    });

    event.node.res.setHeader('Content-Type', 'application/pdf');
    event.node.res.setHeader(
      'Content-Disposition',
      'attachment; filename="cv.pdf"'
    );

    return pdf;
  } catch (error) {
    console.error('Error generating PDF:', error);

    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage:
          'Failed to generate PDF. ' +
          (error instanceof Error ? error.message : 'Unknown error'),
      })
    );
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch {}
    }
  }
});
