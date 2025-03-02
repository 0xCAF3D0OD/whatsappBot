const path = require('path');
const config = require('../../config');

const { timeOutFunction, screenshot, logs } = require('../testBotUtils.js');

async function refreshSearchBar(page, refreshSelector) {
    try {
        await page.waitForSelector(refreshSelector, { timeout: 10000 });
        await page.click(refreshSelector)
            .then(() => screenshot(page, '3"_windowScreenshotRefresh'))
            .then(() => timeOutFunction(page, 2000));
        return true;
    } catch (error) {
        console.warn("Couldn't find refresh button, continuing anyway:", error.message);
        return false;
    }
}

async function searchRightContact(page, searchSelector, currentContact) {
    try {
        await page.waitForSelector(searchSelector);

        await page.click(searchSelector, { delay: 3000 })
            .then(() => screenshot(page, '3_windowScreenshotSelection'))
            .then(() => timeOutFunction(page, 3000));

        await page.type(searchSelector, currentContact)
            .then(() => screenshot(page, '4_windowScreenshotType'))
            .then(() => timeOutFunction(page, 2000));

        await page.keyboard.press("Enter")
            .then(() => screenshot(page, '5_windowScreenshotEnter'))
            .then(() => timeOutFunction(page, 2000));
        return true;
    } catch (error) {
        console.error("Error during adding contact to search bar");
        return false;
    }
}

async function sendMessageToContact(page, contactSelector, message) {
    try {
        await page.waitForSelector(contactSelector)
        await page.type(contactSelector, message)
            .then(() => screenshot(page, '6_windowScreenshotTypeMessages'))
            .then(() => timeOutFunction(page, 1000));
        await page.keyboard.press("Enter")
            .then(() => screenshot(page, '7_windowScreenshotSendMessage'))
            .then(() => timeOutFunction(page, 2000));
    } catch (error) {
        console.error("Error during typing to contact");
        return false;
    }
}

module.exports = {
    refreshSearchBar,
    searchRightContact,
    sendMessageToContact
}