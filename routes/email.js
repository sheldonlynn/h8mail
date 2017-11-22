var express = require('express');
var router = express.Router();

const puppeteer = require('puppeteer');

/* GET users listing. */
router.get('/', function(req, res, next) {
  (async() => {

    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.goto('https://google.com', {waitUntil: 'networkidle'});
    // Type our query into the search bar
    await page.type('test');

    await page.click('input[type="submit"]');

    // Wait for the results to show up
    await page.waitForSelector('h3 a');

    // Extract the results from the page
    const links = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('h3 a'));
      return anchors.map(anchor => anchor.textContent);
    });
    browser.close();
    res.send(links.join('\n'));
  })();
});

module.exports = router;
