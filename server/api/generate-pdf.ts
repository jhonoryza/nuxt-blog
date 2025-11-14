
import { defineEventHandler } from 'h3';
import puppeteer from 'puppeteer';

export default defineEventHandler(async (event) => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ],
  });
  const page = await browser.newPage();

  const protocol = event.node.req.headers['x-forwarded-proto'] || 'http';
  const host = event.node.req.headers['host'];
  const url = `${protocol}://${host}/cv?pdf=true`; 

  await page.goto(url, {
    waitUntil: 'domcontentloaded',
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

  await browser.close();

  event.node.res.setHeader('Content-Type', 'application/pdf');
  event.node.res.setHeader('Content-Disposition', 'attachment; filename="cv.pdf"');

  return pdf;
});
