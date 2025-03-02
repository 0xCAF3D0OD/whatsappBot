const sharp = require('sharp');
const path = require('path');
const fs = require('fs/promises');

const puppeteer = require('puppeteer');
const config = require("../../config");

async function ensureIsLogged(page) {
   const loggedIn = await page.evaluate(() => {
       return (document.querySelector('p.selectable-text.copyable-text.x15bjb6t.x1n2onr6') !== null)
   });
   if (!loggedIn)
       throw new error("Session WhatsApp expirée!");
}

async function screenshot(page, name) {
    name = path.join(__dirname, '../..', 'public/images', `${name}.png`);
    await page.screenshot({ path: name, fullpage: true });
}

async function timeOutFunction(page, time) {
    console.log("wait a sec");
    await page.evaluate((time) => {
        return new Promise(resolve => setTimeout(resolve, time));
    }, time);
}

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
    }]).toFile(path.join(__dirname, '../..', 'public/images', '1_qrCode.png'));

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
        return true;
    } else {
        console.log("L'élément est apparu mais le texte ne correspond pas à 'Discussions' -> " + discussion);
        return false;
    }
}

async function saveSession(page) {
    const cookies = await page.cookies();
    const localStorage = await page.evaluate(() => Object.assign({}, localStorage));
    const sessionStorage = await page.evaluate(() => Object.assign({}, sessionStorage));

    console.log(path.join(config.cookiesDir, "cookies.json"));
    await fs.writeFile(path.join(config.cookiesDir, "cookies.json"), JSON.stringify(cookies, null, "\t"));
    await fs.writeFile(path.join(config.cookiesDir, "localStorage.json"), JSON.stringify(localStorage, null, "\t"));
    await fs.writeFile(path.join(config.cookiesDir, "sessionStorage.json"), JSON.stringify(sessionStorage, null, "\t"));
    console.log('Session sauvegardée');
}

module.exports = {
    generateQRCode,
    waitForQRCodeScan,
    screenshot,
    timeOutFunction,
    ensureIsLogged,
    saveSession,
};