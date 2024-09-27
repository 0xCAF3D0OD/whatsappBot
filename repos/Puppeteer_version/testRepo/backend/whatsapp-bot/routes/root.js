const express = require('express');
const puppeteer = require('puppeteer');
const config = require('../pathConfig');
const path = require('path');
const root = express.Router();

const { screenshot, consoleLog } = require('../controller/botPageUtils');
// const browserState = require("../../../../srcs/whatsapp-bot/routes/testBotFiles/browserState");

root.get('/api/test', (req, res) => {
    res.json({ message: 'Hello from backend im the whatsapp bot!' });
})

let qrCodeScanned = false;

root.get('/', async (req, res) => {

    const browser = await puppeteer.launch({
        executablePath: '/opt/google/chrome/chrome',
        headless: 'false',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const selectorQrCode = 'div._ak96 canvas';
    const whatsappPageConnection = await browser.newPage();

    consoleLog(whatsappPageConnection, 'before goto');

    // Navigate the page to a URL.
    await whatsappPageConnection.goto('https://web.whatsapp.com/');


    // Set screen size.
    await whatsappPageConnection.setViewport({width: 1080, height: 1024});
    await screenshot(whatsappPageConnection, 'viewPort');

    await whatsappPageConnection.waitForSelector(selectorQrCode, { timeout: 120000 });
    await screenshot(whatsappPageConnection, 'whatsapp');

    const QRCodePath = path.join(config.imageDir, '1_QRCode');
    try {
        const QRCodeElement = await whatsappPageConnection.$(selectorQrCode);
        await QRCodeElement.screenshot({path: path.join(config.imageDir, '1_QRCode.png')});

        res.sendFile(path.join(config.imageDir, '1_QRCode.png'));

        qrCodeScanned = await whatsappPageConnection.waitForSelector(selectorQrCode, qrCodeScanned);

        await screenshot(whatsappPageConnection, 'whatsapp');
        await checkQRCodeStatus(whatsappPageConnection);

    } catch(error) {
        console.error(`Error: Scanning qr code failed ${error}`);
        res.status(404).send(`Error: Scanning qr code failed ${error}`);
        // await browserState.getBrowser.close();
        await browser.close();
    }

})
root.get('/check-qr-status', (req, res) => {
    res.json({ scanned: qrCodeScanned });
});

async function checkQRCodeStatus(whatsappPageConnection) {
    try {
        await whatsappPageConnection.waitForSelector('div[data-testid="chat-list"]', { timeout: 0 });
        qrCodeScanned = true;
        console.log('QR Code scanned successfully');
    } catch (error) {
        console.error('Error checking QR code status:', error);
    }
}

module.exports = root;