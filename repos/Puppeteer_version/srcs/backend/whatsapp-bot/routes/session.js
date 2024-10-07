const express = require('express');
const path = require("path");

const browserState = require('../controller/browserState')
const config = require('../pathConfig');
const session = express.Router();

const { consoleLog, screenshot} = require('../controller/botPageUtils')
const { refreshSearchBar, searchRightContact, sendMessageToContact} = require("../controller/chatNavigation");

let currentContact = null;
let lastNotificationCount = 0;

session.get('/', async (req, res) => {
 try {
     consoleLog(null, null, 'hello');

     const WhatsappSessionPage = browserState.getWhatsappPage();
     await WhatsappSessionPage.waitForSelector('h1.x1qlqyl8', { timeout: 120000 });

     consoleLog(null, WhatsappSessionPage, 'whatsapp session');
     await screenshot(WhatsappSessionPage, 'session');

     consoleLog(null, WhatsappSessionPage, 'whatsapp session2');

 } catch (error) {
     console.error(`Error during access session: ${error}`);
 }
})

session.get('/check-notifications', async(req, res) => {
    const whatsappPage = browserState.getWhatsappPage();
    try {
        const notificationCount = await whatsappPage.evaluate(() => {
            const notificationElement = document.querySelector('.two._aigs ._ajv7._ajv8._ajvb span');
            return notificationElement ? parseInt(notificationElement.textContent, 10) : 0;
        })
        lastNotificationCount = notificationCount;
        return res.json({
            notificationCount,
            lastNotificationCount
        })
    } catch (error) {
        console.error("notification was not reached");
        res.status(404).send("notification was not reached");
    }
})

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
