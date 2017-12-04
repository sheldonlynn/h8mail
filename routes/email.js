const express = require('express');
const router = express.Router();
const faker = require('faker');
const puppeteer = require('puppeteer');
const _ = require('lodash');

const postalCodes = [
  'L3Z 3G4',
  'G6L 1A1',
  'E1X 2Y7',
  'J8B 1R2',
  'V0S 1C5',
  'H7B 1L8',
  'V9M 0J8',
  'E6A 2T1',
  'T0L 3S0',
  'P1H 2E3'
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

async function getRandom(num) {
  return Math.floor(Math.random() * num);
}

async function tims(page, email, firstName, lastName, postalCode, day, month, year) {
  await page.evaluate((firstName, lastName, postalCode, email, day, month, year) => {
      document.querySelector('#email').value = email;
      document.querySelector('#firstname').value = firstName;
      document.querySelector('#lastname').value = lastName;
      document.querySelector('#postalcode').value = postalCode;
      document.querySelector('#day31').value = day;
      document.querySelector('#year').value = year;
      document.querySelector('#month').value = month;
  }, firstName, lastName, postalCode, email, day, month, year);

  await page.click('#consent');

  await page.evaluate(() => {
    window.scrollBy(0, window.innerHeight / 2);
  });

  await page.click('.span12 > button.button-contact.submit');
}

/* GET users listing. */
router.post('/', function(req, res) {

  (async() => {

    const browser = await puppeteer.launch({
      /* headless: false,
      slowMo : 250 */
    });
    const page = await browser.newPage();
    await page.goto('http://www.timhortons.com/ca/en/newsletter-signup.php');
    // await page.focus('#firstname');

    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let postalCode = postalCodes[await getRandom(postalCodes.length)];
    let email = req.body.email; //faker.internet.email();
    let year = (await getRandom(57) + 1960);
    let day = (await getRandom(28) + 1);
    let month = months[await getRandom(months.length)];

    await tims(page, email, firstName, lastName, postalCode, day, month, year);

    res.send('subscribed');
  })();
});

module.exports = router;
