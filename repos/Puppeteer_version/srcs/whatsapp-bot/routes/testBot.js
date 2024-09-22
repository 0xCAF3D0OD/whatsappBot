const express = require('express');
const puppeteer = require('puppeteer');
const path = require("path");
const fs = require('fs/promises');

const config = require('../config');
const { waitForQRCodeScan } = require('./testBotFiles/qrCodeSession');
const { saveSession, readDataCookies, setStorageDatas} = require('./testBotFiles/cookiesSession');
const { screenshot, timeOutFunction, testLocalStorage, logs } = require('./testBotFiles/testBotUtils');
const { enterInNewPage } = require('./testBotFiles/accessNewPage');

const testBot = express.Router();

let browser;
let whatsappPage;

// Fonction d'initialisation
async function initializeBrowser() {
    browser = await puppeteer.launch({
        executablePath: '/opt/google/chrome/chrome',
        headless: 'false',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    whatsappPage = await browser.newPage();
    await whatsappPage.goto('https://web.whatsapp.com/');
}

testBot.get('/', async (req, res) => {
    const selectorQrCode = '#app > div > div.landing-wrapper > ' +
        'div.landing-window > div.landing-main > div > div > div._ak96 > div > canvas';
    await initializeBrowser();
    await whatsappPage.bringToFront();
    await whatsappPage.goto('https://web.whatsapp.com/')
        .then(() => timeOutFunction(whatsappPage, 4000))
        .then(() => screenshot(whatsappPage, '0_whatsapp'));


    await whatsappPage.waitForSelector(selectorQrCode, {timeout: 4000});
    const qrCodePath = path.join(config.imageDir, '1_qrCode.png');
    try {
        const qrCodeElement = await whatsappPage.$(selectorQrCode);
        await qrCodeElement.screenshot({path: path.join(config.imageDir, '1_qrCode.png')});

        res.sendFile(path.join(config.pagesDir, 'qrcode-template.html'));

        await waitForQRCodeScan(whatsappPage);
        await saveSession(whatsappPage, qrCodePath)
            .then(() => logs('saveSession'))
            .catch(error => console.error('Erreur lors de la sauvegarde de la session:', error));
    } catch(error) {
        console.error(`Error: Scanning qr code failed ${error}`);
        res.status(404).send(`Error: Scanning qr code failed ${error}`);
    }
    await browser.close();
})

testBot.get('/run-script', async (req, res) => {
    try {
        await initializeBrowser();
        const newWhatsappPage = await browser.newPage();

        //readeFile local session and cookies
        const cookies = await readDataCookies(path.join(config.cookiesDir, "cookies.json"));
        const sessionStorage = await readDataCookies(path.join(config.cookiesDir, "sessionStorage.json"));
        const localStorage = await readDataCookies(path.join(config.cookiesDir, "localStorage.json"));

        newWhatsappPage.setCookie(...cookies);
        logs('cookies saved');
        await newWhatsappPage.goto('https://web.whatsapp.com/');

        const isLoggedIn = await checkIfLoggedIn(newWhatsappPage);

        logs(`user is logged in: ${isLoggedIn}`);
        if (isLoggedIn === true) {
            const result = await setStorageDatas(newWhatsappPage, sessionStorage, localStorage);
            logs(' result: ', result);
            await enterInNewPage(newWhatsappPage)
                .then(() => logs('sessionIsOpen'))
                .catch(error => console.error('Erreur lors de l ouverture de la nouvelle session:', error));
        }
        // await newWhatsappPage.close();
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