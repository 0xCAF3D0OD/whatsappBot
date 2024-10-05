const express = require('express');
const path = require('path');

const config = require('../pathConfig');
const root = express.Router();

const { screenshot, consoleLog } = require('../controller/botPageUtils');
const { initializeBrowser } = require('../controller/initializeBrowser');
const { checkQRCodeStatus } = require('../controller/QRCodeSession');
const browserState = require('../controller/browserState');

process.on('SIGINT', async () => {
    console.log('Received SIGINT. Closing browser and exiting...');
    await browserState.getBrowser().close();
    process.exit();
});

root.get('/test', (req, res) => {
    res.json({ message: 'Hello from backend im the whatsapp bot!' });
})

let qrCodeScanned = false;

root.get('/', async (req, res) => {
    const selectorQrCode = 'div._ak96 canvas';
    const whatsappPageConnection =  await initializeBrowser(selectorQrCode);
    // Brings page to front (activates tab).
    // await whatsappPageConnection.bringToFront();

    const QRCodePath = path.join(config.imageDir, '1_QRCode');
    try {
        const QRCodeElement = await whatsappPageConnection.$(selectorQrCode);
        await QRCodeElement.screenshot({path: path.join(config.imageDir, '1_QRCode.png')});

        res.download(path.join(config.imageDir, '1_QRCode.png'), '1_QRCode.png');

        qrCodeScanned = await whatsappPageConnection.waitForSelector(selectorQrCode, qrCodeScanned);

        await screenshot(whatsappPageConnection, 'whatsapp');
        await checkQRCodeStatus(whatsappPageConnection);

    } catch(error) {
        console.error(`Error: Scanning qr code failed ${error}`);
        res.status(404).send(`Error: Scanning qr code failed ${error}`);
        await browserState.getBrowser().close();
    }
})

root.get('/check_qr_code_status', (req, res) => {
    res.json({ scanned: qrCodeScanned });
});

module.exports = root;