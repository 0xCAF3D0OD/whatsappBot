const express = require('express');
const path = require("path");

const browserState = require('../controller/browserState')
const config = require('../pathConfig');
const session = express.Router();

const { consoleLog, screenshot} = require('../controller/botPageUtils')
const { refreshSearchBar, searchRightContact, sendMessageToContact} = require("../controller/chatNavigation");
const {waitForUserScan, waitForQRCodeScan} = require("../controller/QRCodeSession");

let currentContact = null;
let lastNotificationCount = 0;

session.get('/', async (req, res) => {
 try {
     consoleLog(null, null, 'hello');

     const WhatsappSessionPage = browserState.getWhatsappPage();
     await WhatsappSessionPage.waitForSelector('h1.x1qlqyl8', { timeout: 120000 });

     await screenshot(WhatsappSessionPage, 'session');
     res.download(path.join(config.imageDir, '1_QRCode.png'), '1_QRCode.png');
 } catch (error) {
     console.error(`Error during access session: ${error}`);
 }
})

session.get('/check-notifications', async (req, res) => {
    const whatsappPage = browserState.getWhatsappPage();

    try {
        const notificationStatusSelector = 'div._ajv7._ajv8._ajvb > div > div > div > span';
        await whatsappPage.waitForSelector(notificationStatusSelector, { timeout: 12000 });
        const notificationCount = await whatsappPage.evaluate((selector) => {
            const notificationElement = document.querySelector(selector);
            return notificationElement ? parseInt(notificationElement.textContent, 10) : 0;
        }, notificationStatusSelector);
        lastNotificationCount = notificationCount;
        res.json({
            notificationCount: notificationCount || 0,
            previousNotificationCount: lastNotificationCount || 0,
        });
    } catch (error) {
        console.error("Erreur lors de la vérification des notifications:", error);
        res.status(500).json({
            error: "Erreur lors de la vérification des notifications",
            details: error.message,
            notificationCount: 0
        });
    }
});

session.get('/check-profile-image', async (req, res) => {
    const whatsappPage = browserState.getWhatsappPage();
    try {
        const profileImageSelector = '.xyorhqc img';
        await whatsappPage.waitForSelector(profileImageSelector, { timeout: 12000 });
        const profileImageElement = await whatsappPage.$(profileImageSelector);
        if (profileImageElement) {
            await profileImageElement.screenshot({path: path.join(config.imageDir, 'profileImage.png')});
            res.download(path.join(config.imageDir, 'profileImage.png'), 'profileImage.png');
        }
    } catch (error) {
        console.error("Erreur lors de la vérification des notifications:", error);
        res.status(500).json({
            error: "Erreur lors de la vérification de l'image de profile",
            details: error.message,
        });
    }
});

session.get('/discussions', async (req, res) => {
    const whatsappPage = browserState.getWhatsappPage();

    const selectorSearchInput = 'div > div > p';
    const selectorContactInput = 'footer div > p';
    const selectorRefreshContact = 'div._ak9t  button > span';
    let defaultContact = req.query.contact || "test";
    let message = req.query.message || ".";

    console.log("we are on our way to moneeeyy !");

    try {
        if (currentContact !== defaultContact) {
            currentContact = defaultContact;
            await refreshSearchBar(whatsappPage, selectorRefreshContact);
            await searchRightContact(whatsappPage, selectorSearchInput, currentContact);
        }
        await sendMessageToContact(whatsappPage, selectorContactInput, message);
        console.log("Actions completed successfully 2!");
        // res.sendFile(path.join(config., 'robot.html'));
    } catch (error) {
        console.error("whatsappPage is not accessible");
        res.status(500).send(`whatsappPage is not accessible ${error}`);
    }
});

module.exports = session;
