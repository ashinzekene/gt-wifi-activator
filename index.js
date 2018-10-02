require('dotenv').config();
const puppeteer = require('puppeteer-core');
const locateChrome = require('locate-chrome');
const url = 'http://detectportal.firefox.com/success.txt';

const screenshot = require('./screenshot');

const close = async (page, fail) => {
  await page.browser().close(page, true);
  process.exit(0);
}

(async() => {
  let executablePath = '';
  try {
    executablePath = await locateChrome();
  } catch(err) {
    console.log('It looks like you do not have chrome installed')
  }
  const browser = await puppeteer.launch({ executablePath });
  const page = await browser.newPage();
  await page.goto(url);

  const button_selector = 'a[href="/wordpress/registrationpage/"]';

  // Visit registration page
  try {
    await page.click(button_selector);
  } catch (err) {
    console.log('You\'re either not connected to GT_WiFi or you have already logged in');
    await close(page, true);
  }
  console.log('Chill... Logging you in');
  page.waitForNavigation({ waitUntil: 'domcontentloaded' })

  // Submit form
  try {
    await page.evaluate(() => {
      // Hack to make jQuery load
      setTimeout(() => {
        const form = jQuery('#free_internet_on_click_gui_form')
        if (form) {
          form.submit();
          return true
        } else {
          return false
        };
      }, 3000);
    })
    await page.waitForSelector('span.user_authentication_message');
    await page.waitFor(4000);
    await screenshot(page);
    console.log('Congratulations... Go forth and browse');
    await close(page);
  } catch (err) {
    console.log('An unknown issue occurred. Pls try again...')
    console.log(err);
    await close(page, true);
  }
})()