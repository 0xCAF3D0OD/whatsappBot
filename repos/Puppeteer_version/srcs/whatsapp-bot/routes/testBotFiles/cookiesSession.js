const path = require('path');
const fs = require('fs/promises');
const config = require("../../config");

const { logs, screenshot} = require('./testBotUtils');
const { testLocalStorage, printLocalStorage, timeOutFunction } = require('./testBotUtils');

async function saveSession(page, qrCodePath) {
    logs('sauvegarde de la Session ');

    const cookies = await page.cookies();
    const localStorage = await page.evaluate(() => Object.assign({}, localStorage));

    try {
        await fs.writeFile(path.join(config.cookiesDir, "cookies.json"), JSON.stringify(cookies, null, "\t"))
            .catch(error => console.error('Erreur lors de la sauvegarde de la session:', error));
        await fs.writeFile(path.join(config.cookiesDir, "localStorage.json"), JSON.stringify(localStorage, null, "\t"))
            .catch(error => console.error('Erreur lors de la sauvegarde de la session:', error));
    } catch (error) {
        console.error(`Error the session hasn't been saved ${error}`);
    }
}

async function setupNewSession(page) {
    const cookies = JSON.parse(await fs.readFile(path.join(config.cookiesDir, 'cookies.json'), 'utf-8'));
    const localStorageData = JSON.parse(await fs.readFile(path.join(config.cookiesDir, 'localStorage.json'), 'utf-8'));

    await page.setCookie(...cookies);

    await page.goto('https://web.whatsapp.com/')
        .then(() => timeOutFunction(page, 4000))
        .then(() => screenshot(page, '2_whatsappWeb'));

    await setStorageDatas(page, localStorageData);

    await page.reload()
        .then(() => timeOutFunction(newWhatsappPage, 4000))
        .then(() => screenshot(newWhatsappPage, '3_whatsappWeb'));

}
async function readDataCookies(file) {
    const data = JSON.parse(await fs.readFile(file, 'utf-8'));
    return (data);
}

async function setStorageDatas(page, localStorage) {
    return(await page.evaluate((localStorageData) => {
        window.localStorage.clear();
        //setItem local session and cookies
        Object.keys(localStorageData).forEach(key => {
            window.localStorage.setItem(key, localStorageData[key]);
        });
        return('evaluateOnNewDocument executed successfully');
    }, localStorage));
}

module.exports = {
    saveSession,
    setupNewSession,
    readDataCookies,
    setStorageDatas,
}