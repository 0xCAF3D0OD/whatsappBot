const express = require("express");
const puppeteer = require("puppeteer");
const fs = require('fs/promises');
const sharp = require('sharp');
const path = require('path');

let browser;
let page;

// Création du routeur
const bot = express.Router();


bot.get('/favicon/1x/favicon/', (req, res) => {
    const faviconPath = path.join(__dirname, 'public', 'images', 'favicon.ico');
    res.sendFile(faviconPath);
});

// Définition des routes sur le routeur
bot.get('/', (req, res) => {
    res.send(`
        <h1>Hello World!</h1>
        <button onclick="location.href='/bot/about'">Go to About</button>
        <button onclick="location.href='/bot/contact'">Go to Contact</button>
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
    res.send(`
        <h1>Welcome to about us page</h1>
        <button onclick="location.href='/bot/about/scrape'">Go to Scrape</button>`
    );
    res.end();
});

bot.get('/contact', (req, res) => {
    res.send('Welcome to contact us page');
});

// Exemple d'utilisation de Puppeteer

bot.get('/about/scrape', async (req, res) => {
    try {
        if (!page) {
            return res.status(400).send(`Error occurred while loading`);
        }
        try {
            const content = await page.content();
            res.write(content);
            await page.waitForSelector('div._akau', { timeout: 30000 });
        } catch (e) {
            console.error(`Error during await call`, e);
            return res.status(500).send(`Error during await call: ${e.message}`);
        }

        let qrCodeData, logoSvg;
        try {
            // Extraire le QR code et le logo
            ({ qrCodeData, logoSvg } = await page.evaluate(() => {
                const canvas = document.querySelector('div._akau canvas');
                const svg = document.querySelector('div._akau svg');
                console.log(canvas, svg);
                return {
                    qrCodeData: canvas ? canvas.toDataURL() : null,
                    logoSvg: svg ? svg.outerHTML : null
                };
            }));

            if (!qrCodeData || !logoSvg) {
                throw new Error("QR code or logo not found");
            }
        } catch (e) {
            console.error(`Error during extraction of code and logo`, e);
            return res.status(404).send(`Error during extraction of code and logo: ${e.message}`);
        }

        try {
            // Sauvegarder l'image du QR code
            const base64Data = qrCodeData.replace(/^data:image\/png;base64,/, "");
            await fs.writeFile("qr_code_temp.png", base64Data, 'base64');

            // Créer une image du logo
            await fs.writeFile("logo_temp.svg", logoSvg);

            // Utiliser sharp pour combiner le QR code et le logo
            await sharp("qr_code_temp.png")
                .composite([{
                    input: "logo_temp.svg",
                    top: 100,
                    left: 100,
                    blend: 'over'
                }])
                .toFile("qr_code_with_logo.png");

            console.log('QR Code avec logo sauvegardé dans qr_code_with_logo.png');

            // Nettoyer les fichiers temporaires
            await fs.unlink("qr_code_temp.png");
            await fs.unlink("logo_temp.svg");

            // Envoyer le fichier QR code
            // return res.sendFile(path.resolve("qr_code_with_logo.png"));
        } catch (e) {
            console.error("Error during processing or sending QR code", e);
            return res.status(500).send(`Error during processing or sending QR code: ${e.message}`);
        }
    } catch (error) {
        console.error('Scraping error:', error);
        res.status(500).send(`Error occurred while scraping: ${error.message}`);
    } finally {
        // if (browser) {
        //     await browser.close();
        // }
    }
});

bot.get('/scrape/what', async (req, res) => {
    try {
        console.log(page);
        const content = await page.content();
        res.write(content);
        console.log("Page loaded successfully");    
        res.end();
    } catch (e) {
        console.error("Page error loading");
        res.status(500).send(`Error occurred while loading: ${e.message}`)
    }
});


module.exports = bot;

