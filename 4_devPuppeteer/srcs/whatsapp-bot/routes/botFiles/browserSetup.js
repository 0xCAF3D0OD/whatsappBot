const puppeteer = require("puppeteer");
const fs = require('fs/promises');
let browser;
let page;

// async function loadCookies() {
//     const cookiesString = await fs.readFile('./public/cookies/cookies.json', 'utf8');
//     if (cookiesString)
//         return (JSON.parse(cookiesString));
//     else
//         return null;
// }
//
// async function applyCookies(page) {
//     const cookies = await loadCookies();
//     await page.set(...cookies);
// }
async function initBrowser() {
    try {
        browser ||= await puppeteer.launch({
            executablePath: '/opt/google/chrome/chrome',
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        page ||= await browser.newPage();
        await page.goto("https://web.whatsapp.com/", { waitUntil: 'networkidle0' });
        return page;
    } catch (error) {
        console.error(`something wrong with initBrowser ${error.message}`);
    }
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
