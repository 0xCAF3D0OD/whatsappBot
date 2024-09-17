const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs/promises');
const { screenshot, timeOutFunction, waitForQRCodeScan} = require('./botFiles/botUtils')
const path = require("path");

const testBot = express.Router();

function delay(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time)
    });
}

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
    await page.setViewport({width: 1080, height: 1024});

    await page.waitForSelector(selectorQrCode, {timeout: 2000});

    const qrCodeElement = await page.$(selectorQrCode);
    await qrCodeElement.screenshot({
        path: './public/images/qrCode.png'
    })
    res.sendFile(path.join(__dirname, '.', 'qrcode-template.html'));

    await waitForQRCodeScan(page);

    const cookies = await page.cookies();
    await fs.writeFile('./public/cookies/cookies.json', JSON.stringify(cookies, null, 2));
    // console.log(cookies);

    await page.goto('http://localhost:3000/testBot/run-script/')
    // await page.waitForNavigation({waitUntil: 'networkidle2'})
    //     .then(() => screenshot(page, 'waitForNavigation'));
    // Wait and click on first result
    // const searchResultSelector = '#identifierNext > div > button > span';
    // await page.waitForSelector(searchResultSelector);
    // await page.click(searchResultSelector);

    // Locate the full title with a unique string
    // const textSelector = await page.waitForSelector(
    //     '.active > span:nth-child(1) > span:nth-child(2) > span:nth-child(1)'
    // );
    // await screenshot(page,'enter');
    // const fullTitle = await textSelector?.evaluate(el => el.textContent);

    // Print the full title
    // console.log('The title of this blog post is "%s".', fullTitle);

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
        // Lire et définir les cookies
        // const cookiesString = await fs.readFile('./public/cookies/cookies.json', 'utf8');
        // const cookies = JSON.parse(cookiesString);
        // await page.setCookie(...cookies);

        const localDataJson = await fs.readFile('./public/cookies/localDataStorage.json', 'utf8');
        const localStorageData = JSON.parse(localDataJson);
        console.log(localStorageData);


        //set localStorage stocked in the file ./public/cookies/localDataStorage.json
        // Naviguer vers une page qui nécessite une authentification
        await page.goto('https://web.whatsapp.com/', { waitUntil: 'networkidle2'})            .then(() => timeOutFunction(page, 4000))
            .then(() => screenshot(page, 'redirectionWhatsapp'));
        console.log('before evaluate');
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        const result = await page.evaluate((data) => {
            const logs = [];
            for (const [key, value] of Object.entries(data)) {
                logs.push(`key: ${key}, value: ${value}`);
                console.log(`key: ${key}, value: ${value}`);
                window.localStorage.setItem(key, value);
            }
            return logs
        }, localStorageData);

        console.log(result);

        // Recharger la page pour appliquer le localStorage
        await page.reload({ waitUntil: 'networkidle0' });
        await page.waitForNavigation({waitUntil: 'networkidle2'})
            .then(() => timeOutFunction(page, 4000))
            .then(() => screenshot(page, 'reload'));
        // //     .then(() => timeOutFunction(page,5000))
        //     .then(() => screenshot(page, 'Redirection'))
        //
        // await page.waitForSelector('#title-selector > button > span.login', { timeout: 5000 });
        // page.click('#title-selector > button > span.login')
        //     .then(() => screenshot(page, 'click'));
        //     console.log('Authentification réussie avec les cookies !');
        //     await screenshot(page, 'isLoggedIn');
    } catch (error) {
        console.error('Une erreur est survenue :', error);
    }
});


module.exports = testBot;