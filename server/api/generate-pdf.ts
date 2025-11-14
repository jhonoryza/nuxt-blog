import { defineEventHandler, createError, sendError } from 'h3';
import puppeteer, { Browser } from 'puppeteer';

export default defineEventHandler(async (event) => {
  let browser: Browser | null = null;
  try {
    browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ],
      protocolTimeout: 60000, // Increase timeout to 60 seconds
    });
    const page = await browser.newPage();

    // Use localhost to avoid potential DNS/network loopback issues
    const port = process.env.PORT || 3000;
    const url = `http://127.0.0.1:${port}/cv?pdf=true`;
    //const url = 'http://localhost:3000/cv?pdf=true';

    await page.goto(url, {
      waitUntil: 'networkidle0', // Wait for network to be idle
      timeout: 60000, // Page navigation timeout
    });

    console.log("Generating PDF from:", url);

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
    event.node.res.setHeader('Content-Disposition', 'attachment; filename="cv.pdf"');

    return pdf;
  } catch (error) {
    console.error('Error generating PDF:', error);
    // Don't send a broken download
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'Failed to generate PDF. ' + (error instanceof Error ? error.message : 'Unknown error'),
    }));
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});
