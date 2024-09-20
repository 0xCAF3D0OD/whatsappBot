const express = require('express');
const puppeteer = require('puppeteer');
const path = require("path");
const config = require('../config');

const { screenshot, timeOutFunction, waitForQRCodeScan, saveSession,
    printLocalStorage, readDataCookies, evaluateDataSession} = require('./botFiles/testBotUtils')

const testBot = express.Router();

testBot.get('/', async (req, res) => {
    const selectorQrCode = '#app > div > div.landing-wrapper > div.landing-window > div.landing-main > div > div > div._ak96 > div > canvas';
    const browser = await puppeteer.launch({
        executablePath: '/opt/google/chrome/chrome',
        headless: 'false',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    await page.goto('https://web.whatsapp.com/')
        .then(() => screenshot(page, 'whatsapp'))
        .then(() => timeOutFunction(page, 2000));

    await page.waitForSelector(selectorQrCode, {timeout: 2000});

    const qrCodeElement = await page.$(selectorQrCode);
    await qrCodeElement.screenshot({
        path: './public/images/qrCode.png'
    })

    res.sendFile(path.join(config.pagesDir, 'qrcode-template.html'));

    await waitForQRCodeScan(page);
    await saveSession(page)
        .then(() => timeOutFunction(page, 5000))
        .then(() => screenshot(page, 'reload'));

    await browser.close();
})

testBot.get('/run-script', async (req, res) => {
    try {
        const browser = await puppeteer.launch({
            executablePath: '/opt/google/chrome/chrome',
            headless: 'false',
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();

        await page.goto('https://web.whatsapp.com/');

        const cookies = await readDataCookies(path.join(config.cookiesDir, "cookies.json"), 'cookies');
        const sessionStorage = await readDataCookies(path.join(config.cookiesDir, "sessionStorage.json"), 'sessionStorage');
        const localStorage = await readDataCookies(path.join(config.cookiesDir, "localStorage.json"), 'localStorage');

        await page.setCookie(...cookies);

        await evaluateDataSession(page, sessionStorage);
        await evaluateDataSession(page, localStorage);

        await printLocalStorage(page);
        await timeOutFunction(page, 5000);
        await screenshot(page, 'reload');

    } catch (error) {
        console.error('Une erreur est survenue :', error);
    }
});

module.exports = testBot;