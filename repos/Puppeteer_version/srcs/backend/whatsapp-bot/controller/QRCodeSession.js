async function waitForQRCodeScan(page) {
    console.log("En attente du scan du QR code...");
    try {
        await page.waitForSelector('h1.x1qlqyl8', { timeout: 120000 });
        console.log("selector finded !");
        const discussion = await page.evaluate(() => {
            const element = document.querySelector('h1.x1qlqyl8');
            return element ? element.textContent.trim() : null;
        });
        if (discussion === 'Discussions' || discussion === 'Chats') {
            console.log("QR Code scanné avec succès ! " + discussion);
            return true;
        }
    } catch (error) {
        console.log("L'élément est apparu mais le texte ne correspond pas à 'Discussions' -> " + error);
    }
    return false;
}


async function waitForUserScan(whatsappPageConnection, selectorQrCode) {
    try {
        console.log("Attente du scan utilisateur...");
        await Promise.all([
            whatsappPageConnection.waitForSelector('h1.x1qlqyl8', { hidden: true, timeout: 0 }),
            whatsappPageConnection.waitForSelector(selectorQrCode, { hidden: true, timeout: 0 })
        ]);
        console.log("Les deux sélecteurs sont absents. Scan utilisateur détecté.");
        return true;
    } catch (error) {
        console.error('Error checking QR code status:', error);
        return false;
    }
}

module.exports = {
    waitForQRCodeScan,
    waitForUserScan,
}