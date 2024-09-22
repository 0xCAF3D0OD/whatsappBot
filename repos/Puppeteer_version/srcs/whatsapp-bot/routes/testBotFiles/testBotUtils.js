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

module.exports = {
    screenshot,
    timeOutFunction,
    printLocalStorage,
    setIntervalScreenshot,
    testLocalStorage,
};