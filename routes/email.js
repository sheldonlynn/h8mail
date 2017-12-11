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

var succesful = {};
async function getRandom(num) {
  return Math.floor(Math.random() * num);
}

async function tims(page, email, firstName, lastName, postalCode, day, month, year) {
  await page.goto('http://www.timhortons.com/ca/en/newsletter-signup.php');

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
  }, email);

  await page.click('.span12 > button.button-contact.submit');
}

async function oriental(page, email) {
  await page.goto('http://www.orientaltrading.com');

  await page.mouse.click(0, 0);

  await page.evaluate((email) => {
    document.querySelector('#sign-up-email').value = email;
  }, email);

  // await page.evaluate(() => {
  //   window.scrollBy(0, window.innerHeight / 2);
  // });

  await page.click('.email-signup .inline-button');

  await page.click('li.checkbox-input:nth-of-type(1)');
  await page.click('li.checkbox-input:nth-of-type(2)');
  await page.click('li.checkbox-input:nth-of-type(3)');

  await page.click('#emailForm .btn_primary');
}

async function potterybarn(page, email) {
  await page.goto('https://www.potterybarnkids.com');

  await page.mouse.click(0, 0);

  await page.evaluate((email) => {
    document.querySelector('#footer-email-signup').value = email;
  }, email);

  await page.click('#join-our-email-list .submit-button');

  await page.click('#select-brand li.group-child:nth-of-type(1)');
  await page.click('#select-brand li.group-child:nth-of-type(2)');
  await page.click('#select-brand li.group-child:nth-of-type(3)');
  await page.click('#select-brand li.group-child:nth-of-type(4)');

  await page.click('.actions > #submitNow');
}

async function flowers(page, email) {
  await page.goto('https://www.1800flowers.com');

  await page.evaluate((email) => {
    document.querySelector('#footerEmailOptIn').value = email;
  }, email);

  await page.click('#footerEmailSubmitBtn');
}

async function martha(page, email, firstName) {
  await page.goto('https://secure.marthastewart.com/common/profile/quicksignup.jsp');

  await page.evaluate((email, firstName) => {
    document.querySelector('#firstName').value = firstName;
    document.querySelector('#regEmail').value = email;
  }, email, firstName);

  await page.click('.newsletterContainer:nth-of-type(2)');
  await page.click('.newsletterContainer:nth-of-type(3)');
  await page.click('.newsletterContainer:nth-of-type(4)');

  await page.click('#formSubmit');
}

async function proflowers(page, email) {
  await page.goto('https://www.proflowers.com/');

  await page.evaluate((email) => {
    document.querySelector('#UCEmailSignUp_r > input[type=text]').value = email;
  }, email);

  await page.click('#UCEmailSignUp_r > .button');
}

async function trumpcamp(page, email) {
  await page.goto('https://www.conservativebookclub.com/signups/donald-trump-newsletter-signup');

  await page.evaluate((email) => {
    document.querySelector('input[type=email]').value = email;
  }, email);

  await page.click(".submitpostupform");
}

async function gap(page, email) {
  await page.goto("https://secure-www.gapcanada.ca/profile/info.do?cid=53959");

  await page.evaluate((email) => {
    document.querySelector('#inputEmail').value = email;
    document.querySelector('#inputConfirmEmail').value = email;
  }, email);

  await page.click("#gap_ca_women");
  await page.click("#gap_ca_men");
  await page.click("#gap_ca_kids");
  await page.click("#gap_ca_baby");

  await page.click("#br_ca_pref_check");
  await page.click("#on_ca_pref_check");
  await page.click("#gfs_ca_pref_check");
  await page.click("#brfs_ca_pref_check");

  await page.click("#FormName button[type=submit]");
}

/* POST to mailing listing. */
router.post('/', function(req, res) {

  (async() => {

    const browser = await puppeteer.launch({
      // headless: false,
      // slowMo : 250

    }
    //heroku buildpacks:add https://github.com/jontewks/puppeteer-heroku-buildpack
    );
    const page = await browser.newPage();
    // await page.focus('#firstname');

    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let postalCode = postalCodes[await getRandom(postalCodes.length)];
    let email = req.body.email; //faker.internet.email();
    let year = (await getRandom(57) + 1960);
    let day = (await getRandom(28) + 1);
    let month = months[await getRandom(months.length)];

    try {
      await trumpcamp(page, email);
      succesful["trumpcamp"] = true;
    } catch(e) {
      succesful["trumpcamp"] = false;
    }
    // try{
    //   await oriental(page, email);
    //   succesful["oriental"] = true;
    // } catch(e) {
    //   succesful["oriental"] = false;
    // }
    // try {
    //   await tims(page, email, firstName, lastName, postalCode, day, month, year);
    //   succesful["tims"] = true;
    // } catch(e) {
    //   succesful["tims"] = false;
    // }
    // try {
    //   await potterybarn(page, email);
    //   succesful["potterybarn"] = true;
    // } catch(e) {
    //   succesful["potterybarn"] = false;
    // }
    try {
      await flowers(page, email);
      succesful["flowers"] = true;
    } catch(e) {
      succesful["flowers"] = false;
    }
    // try {
    //   await proflowers(page, email);
    //   succesful["proflowers"] = true;
    // } catch(e) {
    //   succesful["proflowers"] = false;
    // }
    try {
      await martha(page, email, firstName);
      succesful["martha"] = true;
    } catch(e) {
      succesful["martha"] = false;
    }
    try {
      await gap(page, email);
      succesful["gap"] = true;
    } catch(e) {
      succesful["gap"] = false;
    }
    browser.close();
    res.send(succesful);
  })();
});

module.exports = router;
