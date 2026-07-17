const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('pageerror', err => {
    console.error('PAGE ERROR:', err.message);
  });
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error('CONSOLE ERROR:', msg.text());
    }
  });

  try {
    await page.goto('http://localhost:5175/customize', { waitUntil: 'networkidle2' });
    console.log('Navigated to page');
    
    // Find the Summary section and click to expand
    // Assuming the title says "PROFESSIONAL SUMMARY" or similar
    const summaryHeader = await page.$x("//h3[contains(text(), 'PROFESSIONAL SUMMARY')]");
    if (summaryHeader.length > 0) {
      await summaryHeader[0].click();
      console.log('Clicked summary header');
      await page.waitForTimeout(500);
      
      // Click New Entry
      const newEntryBtn = await page.$x("//span[contains(text(), 'New Entry')]/..");
      if (newEntryBtn.length > 0) {
        await newEntryBtn[0].click();
        console.log('Clicked New Entry');
        await page.waitForTimeout(1000);
      } else {
        console.log('Could not find New Entry button');
      }
    } else {
      console.log('Could not find Summary header');
    }
    
  } catch (err) {
    console.error('Script Error:', err);
  } finally {
    await browser.close();
  }
})();
