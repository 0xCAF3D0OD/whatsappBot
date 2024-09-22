const path = require('path');
const fs = require('fs/promises');
const config = require("../../config");
const { logs } = require('./testBotUtils');

const { testLocalStorage, printLocalStorage, timeOutFunction } = require('./testBotUtils');

async function saveSession(page, qrCodePath) {
    await printLocalStorage(page);
    logs('sauvegarde de la Session ');

    const cookies = await page.cookies();
    const localStorage = await page.evaluate(() => Object.assign({}, localStorage));
    const sessionStorage = await page.evaluate(() => Object.assign({}, sessionStorage));

    await testLocalStorage(page, 'testLocalStorage-beginning.json');

    try {
        await fs.writeFile(path.join(config.cookiesDir, "cookies.json"), JSON.stringify(cookies, null, "\t"))
            .catch(error => console.error('Erreur lors de la sauvegarde de la session:', error));
        await fs.writeFile(path.join(config.cookiesDir, "localStorage.json"), JSON.stringify(localStorage, null, "\t"))
            .catch(error => console.error('Erreur lors de la sauvegarde de la session:', error));
        await fs.writeFile(path.join(config.cookiesDir, "sessionStorage.json"), JSON.stringify(sessionStorage, null, "\t"))
            .catch(error => console.error('Erreur lors de la sauvegarde de la session:', error));
    } catch (error) {
        console.error(`Error the session hasn't been saved ${error}`);
    }
}

async function readDataCookies(file) {
    const data = JSON.parse(await fs.readFile(file, 'utf-8'));
    return (data);
}

async function evaluateDataSession(page, dataName) {
    await page.evaluate((data) => {
        Object.keys(data).forEach(key => {
            window.localStorage.setItem(key, data[key]);
        });
    }, dataName);
}
async function setStorageDatas(page, sessionStorage, localStorage) {
    await page.evaluate((sessionStorageData, localStorageData) => {
        window.localStorage.clear();
        window.sessionStorage.clear();
    });
    //setItem local session and cookies
    await evaluateDataSession(page, sessionStorage);
    await evaluateDataSession(page, localStorage);
    // await testLocalStorage(page, 'testLocalStorage-end.json')
    //     .then(() => timeOutFunction(page, 3000));
    return('evaluateOnNewDocument executed successfully');
}

module.exports = {
    saveSession,
    readDataCookies,
    setStorageDatas,
}