const express = require('express');
const puppeteer = require('puppeteer');
const path = require("path");
const fs = require('fs/promises');

const config = require('../config');
const { waitForQRCodeScan } = require('./testBotFiles/qrCodeSession');
const { saveSession, readDataCookies, evaluateDataSession, } = require('./testBotFiles/cookiesSession');
const { screenshot, timeOutFunction, testLocalStorage } = require('./testBotFiles/testBotUtils');

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
        .then(() => screenshot(whatsappPage, 'whatsapp'));


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
        await initializeBrowser();
        const newWhatsappPage = await browser.newPage();

        await newWhatsappPage.evaluateOnNewDocument(() => {
            window.localStorage.clear();
            window.sessionStorage.clear();
            //readeFile local session and cookies
            const cookies = readDataCookies(path.join(config.cookiesDir, "cookies.json"));
            const sessionStorageVar = readDataCookies(path.join(config.cookiesDir, "sessionStorage.json"));
            const localStorageVar = readDataCookies(path.join(config.cookiesDir, "localStorage.json"));

            newWhatsappPage.setCookie(...cookies);
            //setItem local session and cookies
            evaluateDataSession(newWhatsappPage, sessionStorageVar);
            evaluateDataSession(newWhatsappPage, localStorageVar);

            console.log('test2');
            testLocalStorage(newWhatsappPage, 'testLocalStorage-end.json');
        });
        await newWhatsappPage.goto('https://web.whatsapp.com/');

        const isLoggedIn = await checkIfLoggedIn(newWhatsappPage);
        console.log(`user is logged in: ${isLoggedIn}`);
        await newWhatsappPage.close();

    } catch (error) {
        console.error('Une erreur est survenue :', error);
    }
});

async function checkIfLoggedIn(newPage) {
    await timeOutFunction(newPage, 15000);
    await screenshot(newPage, 'reload');
    return(await newPage.evaluate(() => {
        const selectorQrCode = '#app > div > div.landing-wrapper > div.landing-window > ' +
            'div.landing-main > div > div > div._ak96 > div > canvas';
        return !!document.querySelector(selectorQrCode)
    }))
}
module.exports = testBot;