const express = require('express');
const puppeteer = require('puppeteer');
const path = require("path");

const config = require('../config');

const { waitForQRCodeScan } = require('./testBotFiles/qrCodeSession');
const { saveSession, setupNewSession } = require('./testBotFiles/cookiesSession');
const { screenshot, timeOutFunction, logs} = require('./testBotFiles/testBotUtils');
const { enterInNewPage } = require('./testBotFiles/accessNewPage');
const pageWhatsappSession = require('./testBotFiles/pageWhatsappSession');
const browserState = require('./testBotFiles/browserState');

const testBot = express.Router();

let qrCodeScanned = false;

process.on('SIGINT', async () => {
    console.log('Received SIGINT. Closing browser and exiting...');
    const browser = browserState.getBrowser();
    if (browser) {
        await browser.close();
    }
    process.exit();
});

// Fonction d'initialisation
async function initializeBrowser() {
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
            .then(() => screenshot(whatsappPage, '0_whatsapp'));
        browserState.setWhatsappPage(whatsappPage);
    }
    return whatsappPage;
}

testBot.get('/', async (req, res) => {
    const selectorQrCode = '#app > div > div.landing-wrapper > ' +
        'div.landing-window > div.landing-main > div > div > div._ak96 > div > canvas';

    const whatsappPageConnection =  await initializeBrowser();
    await whatsappPageConnection.bringToFront();

    await whatsappPageConnection.waitForSelector(selectorQrCode, { timeout: 60000 })
    const qrCodePath = path.join(config.imageDir, '1_qrCode.png');
    try {
        const qrCodeElement = await whatsappPageConnection.$(selectorQrCode);
        await qrCodeElement.screenshot({path: path.join(config.imageDir, '1_qrCode.png')});

        res.sendFile(path.join(config.pagesDir, 'qrcode-template.html'));

        qrCodeScanned = await waitForQRCodeScan(whatsappPageConnection, qrCodeScanned);
        await screenshot(whatsappPageConnection, 'qrCodeScanned');
        await saveSession(whatsappPageConnection, qrCodePath)
            .then(() => logs('saveSession'))
            .catch(error => console.error('Erreur lors de la sauvegarde de la session:', error));
        await screenshot(whatsappPageConnection, 'sessionSaved');
    } catch(error) {
        console.error(`Error: Scanning qr code failed ${error}`);
        res.status(404).send(`Error: Scanning qr code failed ${error}`);
        await browserState.getBrowser.close();
    }
    // await browser.close();
})

// Methode HTML pour l'obtention du status de whatsapp
// testBot.get('/check_qr_code_status', async (req, res) => {
//     res.json({ scanned: qrCodeScanned })
// })

const getCurrentPage = () => browserState.getWhatsappPage();

pageWhatsappSession(testBot, getCurrentPage);

testBot.get('/newPage', async (req, res) => {
    try {
        const newWhatsappPage = await initializeBrowser();
        await newWhatsappPage.bringToFront();
        // const newWhatsappPage = await browser.newPage();

        await setupNewSession(newWhatsappPage);

        await screenshot(newWhatsappPage, '3_whatsappWebReload');
        const isLoggedIn = await checkIfLoggedIn(newWhatsappPage);
        if (isLoggedIn)
            await enterInNewPage(newWhatsappPage, isLoggedIn);
        else
            logs(`failure ${isLoggedIn}`)
    } catch (error) {
        console.error('Une erreur est survenue :', error);
    }
});

async function checkIfLoggedIn(newPage) {
    await timeOutFunction(newPage, 8000);
    await screenshot(newPage, '2_useHere');
    return(await newPage.evaluate(() => {
        const selectorQrCode = '.x78zum5 .xuxw1ft button.x889kno';
        return !!document.querySelector(selectorQrCode)
    }))
}
module.exports = testBot;