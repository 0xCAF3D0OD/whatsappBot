const path = require('path');
const { timeOutFunction, screenshot } = require('./botUtils.js');
const fs = require('fs/promises');

let currentContact = null;
let lastNotificationCount = 0;

module.exports = (bot, getPage) => {
    bot.get('/about/scrape/what', async (req, res) => {
        try {
            let page = getPage();
            const cookiesString = await fs.readFile('./cookies.json');
            const cookies = JSON.parse(cookiesString.toString());
            await page.setCookie(...cookies);
            console.log("we are on the page !");
            const screenshotPath = path.join(__dirname, '../..', 'public/images', 'windowScreenshot.png');
            await page.screenshot({ path: screenshotPath, fullpage: true })
            global.whatsappPageContent = await page.content();
            res.sendFile(path.join(__dirname, '../..', 'public/pages', 'pageContent.html'));
        } catch (error) {
            console.error("page is not accessible now");
            res.status(500).send(`page is not accessible ${error}`);
        }
    });

    bot.get('/check-notifications', async(req, res) => {
        try {
            let page = getPage();
            /* Page.evaluate(); Évalue une fonction dans le contexte de la page et renvoie le résultat.
            Si la fonction passée à page.evaluate renvoie une promesse,
            la fonction attendra que la promesse soit résolue et renverra sa valeur.*/
            const notificationCount = await page.evaluate(() => {
                const notificationElement = document.querySelector('div.x10l6tqk.x14ipxcb.x1oozmrk span');
                console.log(`notificationElement: ${notificationElement}`);
                return notificationElement ? parseInt(notificationElement.textContent, 10) : 0;
            })

            lastNotificationCount = notificationCount;

            res.json({
                notificationCount,
                lastNotificationCount
            })
        } catch (error) {
            console.error("notification was not reached");
            res.status(404).send("notification was not reached");
        }
    })

    bot.get('/about/scrape/what/launch', async (req, res) => {
        let page = getPage();
        const selectorSearchInput = 'p.selectable-text.copyable-text.x15bjb6t.x1n2onr6';
        const selectorContactInput = 'div[aria-placeholder="Type a message"][contenteditable="true"][data-lexical-editor="true"]';
        const selectorRefreshContact = 'button._ah_y';
        let contact = req.query.contact || "test";
        let message = req.query.message || "yolo";

        console.log("we are on our way to moneeeyy !");

        try {
            // await ensureIsLogged(page);
            if (currentContact !== contact) {
                currentContact = contact;
                /*Page.waitForSelector(); Attendre que le sélecteur apparaisse dans la page. Si, au moment de l'appel de la méthode,
                 le sélecteur existe déjà, la méthode renvoie immédiatement.
                 Si le sélecteur n'apparaît pas après le délai d'attente de quelques millisecondes, la fonction est lancée.*/
                try {
                    await page.waitForSelector(selectorRefreshContact, { timeout: 5000 });
                    await page.click(selectorRefreshContact)
                        .then(() => screenshot(page, 'windowScreenshotRefresh'))
                        .then(() => timeOutFunction(page, 2000));
                } catch (error) {
                    console.warn("Couldn't find refresh button, continuing anyway:", error.message);
                }
                try {
                    await page.waitForSelector(selectorSearchInput);

                    await page.click(selectorSearchInput, { delay: 3000 })
                        .then(() => screenshot(page, 'windowScreenshotSelection'))
                        .then(() => timeOutFunction(page, 3000));

                    await page.type(selectorSearchInput, currentContact)
                        .then(() => screenshot(page, 'windowScreenshotType'))
                        .then(() => timeOutFunction(page, 2000));

                    await page.keyboard.press("Enter")
                        .then(() => screenshot(page, 'windowScreenshotEnter'))
                        .then(() => timeOutFunction(page, 2000));
                } catch (error) {
                    console.error("Error during adding contact to search bar");
                    res.status(500).send(`Error during adding contact to search bar ${error}`);
                }
            }
            try {
                await page.waitForSelector(selectorContactInput)
                await page.type(selectorContactInput, message)
                    .then(() => screenshot(page, 'windowScreenshotEnter'))
                    .then(() => timeOutFunction(page, 1000));
                await page.keyboard.press("Enter")
                    .then(() => screenshot(page, 'windowScreenshotSendMessage'))
                    .then(() => timeOutFunction(page, 2000));
            } catch (error) {
                console.error("Error during typing to contact");
                res.status(500).send(`Error during typing to contact ${error}`);
            }
            console.log("Actions completed successfully 2!");
            res.sendFile(path.join(__dirname, '../..', 'public/pages', 'robot.html'));
        } catch (error) {
            console.error("page is not accessible");
            res.status(500).send(`page is not accessible ${error}`);
        }
    });

}