const path = require('path');
const { generateQRCode ,waitForQRCodeScan, ensureIsLogged, timeOutFunction } = require('./botUtils.js');
const fs = require('fs/promises');

module.exports = (bot, getPage) => {
    const selector = 'div._akau';
    let qrCodeScanned = false;
    let page;
    // Route principale pour afficher et gérer le QR code
    bot.get('/about/scrape', async (req, res) => {
        try {
            page = getPage();
            console.log("Chargement de la page...");
            await page.waitForSelector(selector, { timeout: 6000 });
            console.log("Page chargée avec succès");

            await generateQRCode(page);
            res.sendFile(path.join(__dirname, '../..', 'public/pages', 'qrcode-template.html'));
            // Attendre le scan du QR code en arrière-plan
            waitForQRCodeScan(page).then((scanned) => {
                qrCodeScanned = scanned;
                if (qrCodeScanned) {
                    const cookies = page.cookies();
                    fs.writeFile('./cookies.json', JSON.stringify(cookies, null, 2));
                }
            }).catch(console.error);
        } catch (error) {
            console.error(`Erreur a propos de scrape: ${error.message}`);
        }
    });

    // Methode HTML pour l'obtention du status de whatsapp
    bot.get('/check_qr_code_status', async (req, res) => {
        res.json({ scanned: qrCodeScanned })
    })
}
