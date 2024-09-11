const express = require("express");
const puppeteer = require("puppeteer");
const fs = require('fs/promises');
const sharp = require('sharp');
const path = require('path');
const { generateQRCode ,waitForQRCodeScan } = require('./botUtils.js');

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
        console.error("Erreur:", error);
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

module.exports = bot;

