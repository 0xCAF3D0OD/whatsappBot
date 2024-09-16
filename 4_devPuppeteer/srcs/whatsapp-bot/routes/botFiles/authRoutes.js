const path = require('path');
const { generateQRCode ,waitForQRCodeScan } = require('./botUtils.js');

module.exports = (bot, getPage) => {
    const selector = 'div._akau';
    let qrCodeScanned = false;

    // Route principale pour afficher et gérer le QR code
    bot.get('/about/scrape', async (req, res) => {
        try {
            let page = getPage();
            console.log("Chargement de la page...");
            await page.waitForSelector(selector, { timeout: 6000 });
            console.log("Page chargée avec succès");

            await generateQRCode(page);
            res.sendFile(path.join(__dirname, '../..', 'public/pages', 'qrcode-template.html'));

            // Attendre le scan du QR code en arrière-plan
            waitForQRCodeScan(page).then(scanned => {
                qrCodeScanned = scanned;
            }).catch(console.error);
        } catch (error) {
            res.status(404).send(`Erreur: ${error.message}`);
        }
        // try {
        //     if (qrCodeScanned) {
        //         const newCookies = await page.cookies();
        //         await fs.writeFile('./whatsapp_cookies.json', JSON.stringify(newCookies));
        //     }
        // } catch (error) {
        //     res.status(500).send(`Erreur: ${error.message}`);
        // }
    });

// Methode HTML pour l'obtention du status de whatsapp
    bot.get('/check_qr_code_status', async (req, res) => {
        res.json({ scanned: qrCodeScanned })
    })
}
