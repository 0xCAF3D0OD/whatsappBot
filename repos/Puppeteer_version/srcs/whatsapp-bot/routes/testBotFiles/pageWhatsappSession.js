const path = require('path');

const { timeOutFunction, screenshot, logs } = require('./testBotUtils.js');
const { refreshSearchBar, searchRightContact, sendMessageToContact } = require('./messagesBotUtils/chatNavigation');
const config = require('../../config');

let currentContact = null;
let lastNotificationCount = 0;

module.exports = (testBot, getCurrentPage) => {
    testBot.get('/whatsapp', async (req, res) => {
        try {
            const whatsappPage = getCurrentPage();

            logs("we are on the whatsappPage !");

            const screenshotPath = path.join(config.imageDir, '2_windowScreenshot.png');
            await whatsappPage.screenshot({ path: screenshotPath, fullPage: true })

            global.PageContent = await whatsappPage.content();

            res.sendFile(path.join(config.pagesDir, 'PageContent.html'));

        } catch (error) {
            console.error("whatsappPage is not accessible now");
            res.status(500).send(`whatsappPage is not accessible ${error}`);
        }
    });

    testBot.get('/check-notifications', async(req, res) => {
        const whatsappPage = getCurrentPage();
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

    testBot.get('/whatsapp/discussions', async (req, res) => {
        const whatsappPage = getCurrentPage();
        const selectorSearchInput = 'p.selectable-text.copyable-text.x15bjb6t.x1n2onr6';
        const selectorContactInput = 'div[aria-placeholder="Type a message"][contenteditable="true"][data-lexical-editor="true"]';
        const selectorRefreshContact = 'button._ah_y';
        let contact = req.query.contact || "test";
        let message = req.query.message || "yolo";

        console.log("we are on our way to moneeeyy !");

        try {
            if (currentContact !== contact) {
                currentContact = contact;
                await refreshSearchBar(whatsappPage, selectorRefreshContact);
                await searchRightContact(whatsappPage, selectorSearchInput, currentContact);
            }
            await sendMessageToContact(whatsappPage, selectorContactInput, message);
            console.log("Actions completed successfully 2!");
            res.sendFile(path.join(config.pagesDir, 'robot.html'));
        } catch (error) {
            console.error("whatsappPage is not accessible");
            res.status(500).send(`whatsappPage is not accessible ${error}`);
        }
    });

}