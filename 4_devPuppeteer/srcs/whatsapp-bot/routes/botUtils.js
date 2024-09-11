const sharp = require('sharp');
const path = require('path');

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
        return true;
    } else {
        console.log("L'élément est apparu mais le texte ne correspond pas à 'Discussions' -> " + discussion);
        return false;
    }
}

module.exports = {
    generateQRCode,
    waitForQRCodeScan
};