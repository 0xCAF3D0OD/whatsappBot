const express = require('express');
const path = require('path');

const config = require('../pathConfig');
const root = express.Router();

const { screenshot, consoleLog } = require('../controller/botPageUtils');
const { initializeBrowser } = require('../controller/initializeBrowser');
const { waitForQRCodeScan, waitForUserScan } = require('../controller/QRCodeSession');
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
let scannedStatus = false;
let whatsappPageConnection = null;

root.get('/', async (req, res) => {
    consoleLog(null, null, 'accede to back');
    const selectorQrCode = 'div._ak96 canvas';
    if (!browserState.getBrowser()) {
        whatsappPageConnection =  await initializeBrowser(selectorQrCode);
        consoleLog(null, null, 'initialize browser');
    }

    // Brings page to front (activates tab).
    await whatsappPageConnection.bringToFront();
    try {
        const QRCodeElement = await whatsappPageConnection.$(selectorQrCode);
        if (QRCodeElement && !qrCodeScanned) {
            await QRCodeElement.screenshot({path: path.join(config.imageDir, '1_QRCode.png')});
            res.download(path.join(config.imageDir, '1_QRCode.png'), '1_QRCode.png');
            scannedStatus = await waitForUserScan(whatsappPageConnection);
            console.log(scannedStatus);
            qrCodeScanned = await waitForQRCodeScan(whatsappPageConnection);
            await screenshot(whatsappPageConnection, 'hasbeenscanned');
        }
    } catch(error) {
        console.error(`Error: Scanning qr code failed ${error}`);
        res.status(404).send(`Error: Scanning qr code failed ${error}`);
        await browserState.getBrowser().close();
    }
})

root.get('/whatsappSession', async (req, res) => {
    try {
        consoleLog(null, null, 'hello');
        const WhatsappSessionPage = browserState.getWhatsappPage();
        await WhatsappSessionPage.waitForSelector('h1.x1qlqyl8', { timeout: 120000 });

        consoleLog(null, WhatsappSessionPage, 'whatsapp session');
        await screenshot(WhatsappSessionPage, 'session');

    } catch (error) {
        console.error(`Error during access session: ${error}`);
    }
})

/* a voir plus tard */
root.get('/check_scanned_status', (req, res) => {
    res.json({ iwasScanned: qrCodeScanned });
});

root.get('/check_qr_code_status', (req, res) => {
    res.json({ scanned: qrCodeScanned });
});

module.exports = root;