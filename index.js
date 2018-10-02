#!/usr/bin/env node

const puppeteer = require('puppeteer-core');
const locateChrome = require('locate-chrome');
const url = 'http://detectportal.firefox.com/success.txt';

const screenshot = require('./screenshot');
const button_selector = 'a[href="/wordpress/registrationpage/"]';

const close = async (page, fail) => {
  await page.browser().close(page, true);
  process.exit(0);
}

(async() => {
  console.log('⚡ Welcome to the GT Activator CLI');
  console.log('  __________________________________');
  let executablePath = '';
  try {
    executablePath = await locateChrome();
  } catch(err) {
    console.log('⛔ It looks like you do not have chrome installed');
    await close(page, true);
  }
  const browser = await puppeteer.launch({ executablePath });
  const page = await browser.newPage();
  try {
    await page.goto(url);
  } catch (err) {
    console.log('⛔ It looks like you are offline');
    await close(page, true);
  }


  // Visit registration page
  try {
    await page.click(button_selector);
  } catch (err) {
    console.log('⛔ You\'re either not connected to GT_WiFi or you have already logged in');
    await close(page, true);
  }
  console.log('🖋 Chill... Logging you in');
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
    console.log('📶 Congratulations... Go forth and browse');
    await close(page);
  } catch (err) {
    console.log('⛔ An unknown issue occurred. Pls try again...')
    console.log(err);
    await close(page, true);
  }
})()