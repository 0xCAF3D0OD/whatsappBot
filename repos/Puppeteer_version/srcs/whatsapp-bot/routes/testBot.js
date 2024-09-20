const express = require('express');
const puppeteer = require('puppeteer');
const path = require("path");
const fs = require('fs/promises');
const config = require('../config');

const { screenshot, timeOutFunction, waitForQRCodeScan, saveSession,
    printLocalStorage, readDataCookies, evaluateDataSession,
    testLocalStorage } = require('./botFiles/testBotUtils')

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

// Appelez cette fonction au démarrage
initializeBrowser();

testBot.get('/', async (req, res) => {
    const selectorQrCode = '#app > div > div.landing-wrapper > ' +
        'div.landing-window > div.landing-main > div > div > div._ak96 > div > canvas';
    await whatsappPage.bringToFront();
    await whatsappPage.goto('https://web.whatsapp.com/')
        .then(() => timeOutFunction(whatsappPage, 4000))
        .then(() => screenshot(whatsappPage, 'whatsapp'));

    await testLocalStorage(whatsappPage, 'testBot');


    await whatsappPage.waitForSelector(selectorQrCode, {timeout: 4000});
    const qrCodePath = path.join(config.imageDir, 'qrCode.png');
    try {
        const qrCodeElement = await whatsappPage.$(selectorQrCode);
        await qrCodeElement.screenshot({path: path.join(config.imageDir, 'qrCode.png')});

        res.sendFile(path.join(config.pagesDir, 'qrcode-template.html'));

        await waitForQRCodeScan(whatsappPage);

        await saveSession(whatsappPage, qrCodePath)
            .then(() => console.log('saveSession'))
            .catch(error => console.error('Erreur lors de la sauvegarde de la session:', error));
    } catch(error) {
        console.error(`Error: Scanning qr code failed ${error}`);
        res.status(404).send(`Error: Scanning qr code failed ${error}`);
    }
    await browser.close();
})

testBot.get('/run-script', async (req, res) => {
    try {
        const newWhatsappPage = await browser.newPage();
        await newWhatsappPage.goto('https://web.whatsapp.com/');

        const cookies = await readDataCookies(path.join(config.cookiesDir, "cookies.json"));
        const sessionStorage = await readDataCookies(path.join(config.cookiesDir, "sessionStorage.json"));
        const localStorage = await readDataCookies(path.join(config.cookiesDir, "localStorage.json"));

        await newWhatsappPage.setCookie(...cookies);

        await evaluateDataSession(newWhatsappPage, sessionStorage);
        await evaluateDataSession(newWhatsappPage, localStorage);

        await testLocalStorage(newWhatsappPage, 'testLocalStorage-end.json');

        await timeOutFunction(newWhatsappPage, 15000);
        await screenshot(newWhatsappPage, 'reload');

        const isLoggedIn = await checkIfLoggedIn(newWhatsappPage);
        console.log(`user is logged in: ${isLoggedIn}`);
        await newWhatsappPage.close();

    } catch (error) {
        console.error('Une erreur est survenue :', error);
    }
});

async function checkIfLoggedIn(newPage) {
    return(await newPage.evaluate(() => {
        const selectorQrCode = '#app > div > div.landing-wrapper > div.landing-window > ' +
            'div.landing-main > div > div > div._ak96 > div > canvas';
        return !!document.querySelector(selectorQrCode)
    }))
}
module.exports = testBot;