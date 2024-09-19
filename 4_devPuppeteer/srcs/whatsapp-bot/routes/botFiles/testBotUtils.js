const sharp = require('sharp');
const path = require('path');
const fs = require('fs/promises');
const config = require("../../config");

async function screenshot(page, name) {
    name = path.join(__dirname, '../..', 'public/images', `${name}.png`);
    await page.screenshot({ path: name, fullpage: true });
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

async function saveSession(page) {
    const cookies = await page.cookies();
    const localStorage = await page.evaluate(() => Object.assign({}, localStorage));
    const sessionStorage = await page.evaluate(() => Object.assign({}, sessionStorage));

    console.log(path.join(config.cookiesDir, "cookies.json"));
    await fs.writeFile(path.join(config.cookiesDir, "cookies.json"), JSON.stringify(cookies, null, "\t"));
    await fs.writeFile(path.join(config.cookiesDir, "localStorage.json"), JSON.stringify(localStorage, null, "\t"));
    await fs.writeFile(path.join(config.cookiesDir, "sessionStorage.json"), JSON.stringify(sessionStorage, null, "\t"));
    console.log('Session sauvegardée');
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
            "WAMms4Conn",
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
}

async function readDataCookies(file, name) {
    name = await fs.readFile(file, 'utf8');
    return JSON.parse(name);
}

async function evaluateDataSession(page, name) {
    await page.evaluate((data) => {
        for (const [key, value] of Object.entries(data)) {
            name[key] = value;
        }
    }, name);

}

module.exports = {
    screenshot,
    timeOutFunction,
    waitForQRCodeScan,
    saveSession,
    printLocalStorage,
    readDataCookies,
    evaluateDataSession
};