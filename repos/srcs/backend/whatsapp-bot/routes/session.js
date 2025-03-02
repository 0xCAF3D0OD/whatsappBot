const express = require('express');
const path = require("path");

const browserState = require('../controller/browserState')
const config = require('../pathConfig');
const session = express.Router();

const { consoleLog, screenshot} = require('../controller/botPageUtils')
const { refreshSearchBar, searchRightContact, sendMessageToContact} = require("../controller/chatNavigation");
const selector = require("../selectors");

let currentContact = null;
let lastNotificationCount = 0;

session.get('*', (req, res) => {
    res.status(404).send('Page not found');
});

session.get('/', async (req, res) => {
 try {
     const WhatsappSessionPage = browserState.getWhatsappPage();
     await WhatsappSessionPage.waitForSelector(selector.titleName, { timeout: 120000 });

     await screenshot(WhatsappSessionPage, 'session');
     res.download(path.join(config.imageDir, '1_QRCode.png'), '1_QRCode.png');
 } catch (error) {
     console.error(`Error during access session: ${error}`);
 }
})

session.get('/check-notifications', async (req, res) => {
    const whatsappPage = browserState.getWhatsappPage();

    try {
        const notificationStatusSelector = selector.notificationStatus;
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
        const profileImageSelector = selector.profileImage;
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

    let defaultContact = req.query.contact || "test";
    let message = req.query.message || ".";

    try {
        if (currentContact !== defaultContact) {
            currentContact = defaultContact;
            await refreshSearchBar(whatsappPage, selector.refreshContactButton);
            await searchRightContact(whatsappPage, selector.searchInput, currentContact);
        }
        await sendMessageToContact(whatsappPage, selector.contactInput, message);
        console.log("Actions completed successfully 2!");
    } catch (error) {
        console.error("whatsappPage is not accessible");
        res.status(500).send(`whatsappPage is not accessible ${error}`);
    }
});

module.exports = session;
