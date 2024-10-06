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

async function checkQRCodeStatus(whatsappPageConnection) {
    try {
        await whatsappPageConnection.waitForSelector('div[data-testid="chat-list"]', { timeout: 0 });
        qrCodeScanned = true;
        console.log('QR Code scanned successfully');
    } catch (error) {
        console.error('Error checking QR code status:', error);
    }
}

module.exports = {
    waitForQRCodeScan,
    checkQRCodeStatus,
}