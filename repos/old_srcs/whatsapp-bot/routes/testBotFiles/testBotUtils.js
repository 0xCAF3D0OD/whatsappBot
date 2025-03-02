const path = require('path');
const fs = require('fs/promises');
const config = require("../../config");

function logs(title) {
    console.log(`- LOGS: ${title}`);
}
async function testLocalStorage(file, fileName, dataName) {
    const localStorage = await file.evaluate(() => Object.assign({}, localStorage));
    await fs.writeFile(path.join(config.cookiesDir, fileName), JSON.stringify(localStorage, null, "\t"))
}

async function screenshot(page, name) {
    name = path.join(__dirname, '../..', 'public/images', `${name}.png`);
    await page.screenshot({ path: name, fullpage: true });
    await timeOutFunction(page, 1500);
}

async function timeOutFunction(page, time) {
    console.log(`- LOGS: Timeout ${time}`);
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

async function returnSelector(page, title) {
    return(await page.evaluate((nameButton) => {
        console.log('evaluate');
        const button = Array.from(document.querySelectorAll('button')).find(btn =>
            btn.textContent.trim() === nameButton
        );
        if (button) {
            // Générer un sélecteur unique pour le bouton
            let selector = button.id ? `#${button.id}` : button.className ? `.${button.className.split(' ').join('.')}` : '';
            if (!selector) {
                // Si pas d'ID ni de classe, utiliser un sélecteur plus complexe
                const index = Array.from(button.parentNode.children).indexOf(button);
                selector = `${button.tagName.toLowerCase()}:nth-child(${index + 1})`;
            }
            return selector;
        }
        return null;
    }, title));
}

module.exports = {
    screenshot,
    timeOutFunction,
    printLocalStorage,
    testLocalStorage,
    returnSelector,
    logs,
};