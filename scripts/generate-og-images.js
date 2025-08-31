const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generateOGImages() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to 1200x630 for optimal social media sharing
  await page.setViewport({ width: 1200, height: 630 });
  
  // Generate light theme image
  const lightHtmlPath = path.join(__dirname, '../public/og-image.html');
  const lightHtml = fs.readFileSync(lightHtmlPath, 'utf8');
  await page.setContent(lightHtml);
  await page.screenshot({ 
    path: path.join(__dirname, '../public/og-image.jpg'),
    type: 'jpeg',
    quality: 90
  });
  
  // Generate dark theme image
  const darkHtmlPath = path.join(__dirname, '../public/og-image-dark.html');
  const darkHtml = fs.readFileSync(darkHtmlPath, 'utf8');
  await page.setContent(darkHtml);
  await page.screenshot({ 
    path: path.join(__dirname, '../public/og-image-dark.jpg'),
    type: 'jpeg',
    quality: 90
  });
  
  await browser.close();
  console.log('✅ Generated social share images: og-image.jpg and og-image-dark.jpg');
}

generateOGImages().catch(console.error);
