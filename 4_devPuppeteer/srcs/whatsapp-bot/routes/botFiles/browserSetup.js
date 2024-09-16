const puppeteer = require("puppeteer");
let browser;
let page;

async function initBrowser() {
    browser ||= await puppeteer.launch({
        executablePath: '/opt/google/chrome/chrome',
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    page ||= await browser.newPage();
        await page.goto("https://web.whatsapp.com/", { waitUntil: 'networkidle0' });
    return page;
}

const getPage = () => page;

async function closeBrowser() {
    if (browser) {
        await browser.close();
        browser = null;
        page = null;
    }
}

module.exports = { initBrowser, getPage, closeBrowser };
