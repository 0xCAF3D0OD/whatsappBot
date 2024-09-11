const express = require("express");
const puppeteer = require("puppeteer");
const fs = require('fs/promises');
const sharp = require('sharp');
const path = require('path');

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
    res.send(`
        <h1>Welcome to about us page</h1>
        <button onclick="location.href='/bot/about/scrape'">Go to Scrape</button>`
    );
    res.end();
});

// Exemple d'utilisation de Puppeteer
bot.get('/about/scrape', async (req, res) => {
    try {
        console.log(page);
        const content = await page.content();
        res.write(content);
        console.log("Page loaded successfully");
        try {
            await page.waitForSelector('div._akau', { timeout: 6000 }); // Attendre jusqu'à 60 secondes

            // Extraire le QR code et le logo
            const { qrCodeData, logoSvg } = await page.evaluate(() => {
                const canvas = document.querySelector('div._akau canvas');
                const svg = document.querySelector('div._akau svg');
                return {
                    qrCodeData: canvas.toDataURL(),
                    logoSvg: svg.outerHTML
                };
            });

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
        }  catch (error) {
            console.error('Erreur lors de l\'attente du QR code:', error);
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

// bot.get('/scrape/what', async (req, res) => {
//     try {
//         console.log(page);
//         const content = await page.content();
//         res.write(content);
//         console.log("Page loaded successfully");    
//         res.end();
//     } catch (e) {
//         console.error("Page error loading");
//         res.status(500).send(`Error occurred while loading: ${e.message}`)
//     }
// });


module.exports = bot;

