const path = require('path');
const fs = require('fs/promises');
const config = require("../../config");

async function testLocalStorage(file, fileName) {
    const localStorage = await file.evaluate(() => Object.assign({}, localStorage));
    await fs.writeFile(path.join(config.cookiesDir, fileName), JSON.stringify(localStorage, null, "\t"))
}
async function screenshot(page, name) {
    name = path.join(__dirname, '../..', 'public/images', `${name}.png`);
    await page.screenshot({ path: name, fullpage: true });
}

async function setIntervalScreenshot(page, selectorQrCode, interval) {
    setInterval(async () => {
        try {
            const qrCodeElement = await page.$(selectorQrCode);
            await qrCodeElement.screenshot({path: path.join(config.imageDir, 'qrCode.png')});
        } catch (error) {
            console.error(`Error: Scanning qr code failed ${error}`);
        }
    }, interval);
}

async function timeOutFunction(page, time) {
    console.log("wait a sec");
    await page.evaluate((time) => {
        return new Promise(resolve => setTimeout(resolve, time));
    }, time);
}

// Fonction pour attendre le scan du QR code
async function waitForQRCodeScan(page) {
    console.log("En attente du scan du QR code...");
    await page.waitForSelector('h1.x1qlqyl8', { timeout: 120000 });

    const discussion = await page.evaluate(() => {
        const element = document.querySelector('h1.x1qlqyl8');
        return element ? element.textContent.trim() : null;
    });

    if (discussion === 'Discussions' || discussion === 'Chats') {
        console.log("QR Code scanné avec succès ! " + discussion);
        return true;
    } else {
        console.log("L'élément est apparu mais le texte ne correspond pas à 'Discussions' -> " + discussion);
        return false;
    }
}

async function saveSession(page, qrCodePath) {
    await printLocalStorage(page);
    console.log('sauvegarde de la Session ');

    const cookies = await page.cookies();
    const localStorage = await page.evaluate(() => Object.assign({}, localStorage));
    const sessionStorage = await page.evaluate(() => Object.assign({}, sessionStorage));

    console.log(sessionStorage);
    await testLocalStorage(page, 'localStorageCheck.json');


    try {
        await fs.writeFile(path.join(config.cookiesDir, "cookies.json"), JSON.stringify(cookies, null, "\t"))
            .catch(error => console.error('Erreur lors de la sauvegarde de la session:', error));
        await fs.writeFile(path.join(config.cookiesDir, "localStorage.json"), JSON.stringify(localStorage, null, "\t"))
            .catch(error => console.error('Erreur lors de la sauvegarde de la session:', error));
        await fs.writeFile(path.join(config.cookiesDir, "sessionStorage.json"), JSON.stringify(sessionStorage, null, "\t"))
            .catch(error => console.error('Erreur lors de la sauvegarde de la session:', error));
        console.log('Session sauvegardée');
    } catch (error) {
        console.error(`Error the session hasn't been saved ${error}`);
    }
}

async function printLocalStorage(page) {
    const localStorageKeys = await page.evaluate(() => {
        const targetKeys = [
            "Session",
            "WANoiseInfo",
            "WANoiseInfoIv",
            "WAWebEncKeySalt",
            "WALid",
            "WARoutingInfo",
            // "WAMms4Conn",
            "WAWebTimeSpentSession",
            "WAUnknownID",
            "last-wid-md"
        ];
        let result = {};
        for (const key of targetKeys)
            result[key] = window.localStorage.getItem(key);
        return result;
    })
    console.log('keys = ' + JSON.stringify(localStorageKeys, null, 2));
    return localStorageKeys
}

async function readDataCookies(file) {
    const data = await fs.readFile(file, 'utf8');
    console.log('data: ', data);
    return JSON.parse(data);
}

async function evaluateDataSession(page, dataName) {
   await page.evaluate((data) => {
        for (const [key, value] of Object.entries(data))
                window.localStorage.setItem(key, JSON.stringify(value));
    }, dataName);
   console.log('test1');
   await printLocalStorage(page, dataName);
}

module.exports = {
    screenshot,
    timeOutFunction,
    waitForQRCodeScan,
    saveSession,
    printLocalStorage,
    readDataCookies,
    evaluateDataSession,
    setIntervalScreenshot,
    testLocalStorage,
};