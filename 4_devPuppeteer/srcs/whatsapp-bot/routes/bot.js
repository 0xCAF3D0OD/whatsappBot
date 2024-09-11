const express = require("express");
const puppeteer = require("puppeteer");
const fs = require('fs/promises');
const sharp = require('sharp');
const path = require('path');

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

// Fonction pour générer et sauvegarder le QR code
async function generateQRCode(page) {
    const { qrCodeData, logoSVG } = await page.evaluate(() => {
        const canvas = document.querySelector('div._akau canvas');
        const svg = document.querySelector('div._akau svg');
        return {
            qrCodeData: canvas.toDataURL(),
            logoSVG: svg.outerHTML
        };
    });

    const qrCodeDataBuffer = Buffer.from(qrCodeData.split(',')[1], 'base64');
    const logoSVGBuffer = Buffer.from(logoSVG);

    await sharp(qrCodeDataBuffer).composite([{
        input: logoSVGBuffer,
        gravity: 'center',
        blend: 'over'
    }]).toFile(path.join(__dirname, '..', 'public/images', 'qrCode.png'));

    console.log('QR Code avec logo sauvegardé comme qrCode.png');
}

// Fonction pour attendre le scan du QR code
async function waitForQRCodeScan(page) {
    console.log("En attente du scan du QR code...");
    await page.waitForSelector('h1.x1qlqyl8', { timeout: 120000 });

    const discussion = await page.evaluate(() => {
        const element = document.querySelector('h1.x1qlqyl8');
        return element ? element.textContent.trim() : null;
    });

    if (discussion === 'Discussions' || discussion === 'Chats') {
        console.log("QR Code scanné avec succès ! " + discussion);
        qrCodeScanned = true;
    } else {
        console.log("L'élément est apparu mais le texte ne correspond pas à 'Discussions' -> " + discussion);
    }
}

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
        waitForQRCodeScan(page).catch(console.error);
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

bot.get('/get-page-content', async (req, res) => {
    if (global.whatsappPageContent)
        res.send(global.whatsappPageContent);
    else
        res.status(404).send('Contenu de la page non disponible');
})
module.exports = bot;

