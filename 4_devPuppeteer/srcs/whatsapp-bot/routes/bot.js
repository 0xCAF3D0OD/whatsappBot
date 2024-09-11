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

bot.get(('/about/scrape'), async (req, res) => {
    try {
        console.log("chargement de la page...");
        await page.waitForSelector('div._akau', { timeout: 60000 });
        console.log("page chargee avec succes");

        const { qrCodeData, logoSVG} = await page.evaluate(() => {
            const canvas = document.querySelector('div._akau canvas');
            const svg = document.querySelector('div._akau svg');
            return {
                qrCodeData: canvas.toDataURL(),
                logoSVG: svg.outerHTML
            };
        });

        const qrCodeDataBuffer = Buffer.from(qrCodeData.split(',')[1], 'Base64');
        console.log("qrCodeBuffer has been set");
        const logoSVGBuffer = Buffer.from(logoSVG);
        console.log("logoSVGBuffer has been set");

        await sharp(qrCodeDataBuffer).composite([{
            input: logoSVGBuffer,
            gravity: 'center',
            blend: 'over'
        }]).toFile('qrCode.png');

        console.log('QR Code avec logo sauvegardé comme qrCode.png');
        const qrCodePath = '/qrCode.png';
        res.sendFile(path.join(__dirname, '..', 'qrcode-template.html'));
    } catch (error) {
        console.error("Error during loading page");
        res.status(500).send(`Error during loading page ${error}`);
    }
})

module.exports = bot;

