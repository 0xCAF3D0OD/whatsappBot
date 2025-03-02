const express = require('express');
const path = require('path');
const config = require('../pathConfig');

function consoleLog(type, file, message) {
    if (type === 'json')
        console.log(`LOGS: ${JSON.stringify(file)} ${message}`);
    else
        console.log(`LOGS: ${file} ${message}`);
}

async function screenshot(page, name) {
    name = path.join(config.imageDir, `${name}.png`);
    await page.screenshot({ path: name, fullpage: true });
}

async function timeOutFunction(page, time) {
    console.log(`- LOGS: Timeout ${time}`);
    await page.evaluate((time) => {
        return new Promise(resolve => setTimeout(resolve, time));
    }, time);
}

module.exports = {
    screenshot,
    consoleLog,
    timeOutFunction,
}