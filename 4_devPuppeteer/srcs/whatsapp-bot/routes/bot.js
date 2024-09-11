const express = require("express");
const puppeteer = require("puppeteer");
const fs = require('fs/promises');
const sharp = require('sharp');
const path = require('path');
const { generateQRCode ,waitForQRCodeScan, timeOutFunction, screenshot } = require('./botUtils.js');
const events = require("events");

let lastNotificationCount = 0;
let qrCodeScanned = false;
let browser;
let page;

// Création du routeur
const bot = express.Router();

// Définition des routes sur le routeur
bot.get('/', (req, res) => {
    res.send(`
        <h1>Hello World!</h1>
        <button onclick="location.href='/bot/about'">Go to About</button>
    `);
});

bot.get('/about', async (req, res) => {
    browser = await puppeteer.launch({
        executablePath: '/opt/google/chrome/chrome',
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    page = await browser.newPage();
    await page.goto("https://web.whatsapp.com/", { waitUntil: 'networkidle0' });
    res.sendFile(path.join(__dirname, '..', 'public/pages', 'home_connection.html'));
});

// Route principale pour afficher et gérer le QR code
bot.get('/about/scrape', async (req, res) => {
    try {
        console.log("Chargement de la page...");
        await page.waitForSelector('div._akau', { timeout: 60000 });
        console.log("Page chargée avec succès");

        qrCodeScanned = false;
        await generateQRCode(page);
        res.sendFile(path.join(__dirname, '..', 'public/pages', 'qrcode-template.html'));

        // Attendre le scan du QR code en arrière-plan
        waitForQRCodeScan(page).then(scanned => {
            qrCodeScanned = scanned;
        }).catch(console.error);
    } catch (error) {

        res.status(500).send(`Erreur: ${error.message}`);
    }
});

// Methode HTML pour l'obtention du status de whatsapp
bot.get('/check_qr_code_status', async (req, res) => {
    res.json({ scanned: qrCodeScanned })
})

bot.get('/about/scrape/what', async (req, res) => {
    try {
        console.log("we are on the page !");
        const screenshotPath = path.join(__dirname, '..', 'public/images', 'windowScreenshot.png');
        await page.screenshot({ path: screenshotPath, fullpage: true })
        global.whatsappPageContent = await page.content();
        res.sendFile(path.join(__dirname, '..', 'public/pages', 'pageContent.html'));
    } catch (error) {
        console.error("page is not accessible");
        res.status(500).send(`page is not accessible ${error}`);
    }
});

bot.get('/check-notifications', async(req, res) => {
    try {
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
    res.sendFile(path.join(__dirname, '..', 'public/pages', 'robot.html'));
    const selector1 = 'p.selectable-text.copyable-text.x15bjb6t.x1n2onr6';
    const selector2 = 'span.matched-text._ao3e'
    if (! req.query.contact) return res.status(404).send("no contact given");
    if (! req.query.message) return res.status(404).send("no message given");
    console.log("we are on our way to moneeeyy !");
    try {

        /*Page.waitForSelector(); Attendre que le sélecteur apparaisse dans la page. Si, au moment de l'appel de la méthode,
         le sélecteur existe déjà, la méthode renvoie immédiatement.
         Si le sélecteur n'apparaît pas après le délai d'attente de quelques millisecondes, la fonction est lancée.*/
        await page.waitForSelector(selector1)
            .then(() => page.click(selector1, {
                delay: 3000
            }));
        if (! req.query.contact) return res.status(404).send("no contact given");

        await screenshot(page, 'windowScreenshotSelection');
        await timeOutFunction(page, 3000);

        await page.type(selector1, req.query.contact);

        await screenshot(page, 'windowScreenshotType');
        await timeOutFunction(page, 3000);

        await page.keyboard.press("Enter");

        await screenshot(page, 'windowScreenshotEnter');
        await timeOutFunction(page, 3000);
        console.log("Actions completed successfully!");

        let messageAmount = 1;

        await page.waitForSelector(selector2)
            .then(() => page.click(selector2, {
                delay: 3000
            }));

        await page.type(selector2, req.query.message);
        // for(let i = 0; i<messageAmount; i++){
        //     await timeOutFunction(page, 3000);
        //
        //     await page.type(selector2, "yollo");
        //
        //     await timeOutFunction(page, 3000);
        //
        //     // await page.keyboard.press("Enter");
        // }
        console.log("Actions completed successfully 2!");
        await screenshot(page, 'windowScreenshotSendMessage');

    } catch (error) {
        console.error("page is not accessible");
        res.status(500).send(`page is not accessible ${error}`);
    }
});

module.exports = bot;

