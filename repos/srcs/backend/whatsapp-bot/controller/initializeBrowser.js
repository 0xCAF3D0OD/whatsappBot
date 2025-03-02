const puppeteer = require('puppeteer');

const browserState = require('./browserState');
const {screenshot} = require("./botPageUtils");

async function initializeBrowser(selectorQRCode) {
    let browser = browserState.getBrowser();
    let whatsappPage = browserState.getWhatsappPage();

    if (!browser || !browser.isConnected()) {
        browser = await puppeteer.launch({
            executablePath: '/opt/google/chrome/chrome',
            headless: 'false',
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        browserState.setBrowser(browser);
    }
    if (!whatsappPage || whatsappPage.isClosed()) {
        whatsappPage = await browser.newPage();
        await whatsappPage.goto('https://web.whatsapp.com/', { timeout: 60000 })
            .then(() => whatsappPage.setViewport({width: 1080, height: 1024}))
            .then(() => whatsappPage.waitForSelector(selectorQRCode, { timeout: 120000 }))
            .then(() => screenshot(whatsappPage, 'whatsapp'));

        browserState.setWhatsappPage(whatsappPage);
    }
    return whatsappPage;
}

module.exports = {
    initializeBrowser,
}