import {Backend, Login} from "../routes.js";

export const checkingQrCode = () => ({
    async waitForConfirmationQRCode() {
        this.isScanned = false;
        try {
            const response = await fetch(`${Backend}${Login}/check_qr_code_status`);
            const data = await response.json();
            if (data.scanned) {
                console.log('QR Code scanné avec succès !');
                this.isScanned = true;
            } else
                setTimeout(() => this.waitForConfirmationQRCode(), 5000);
        } catch (error) {
            console.error('Erreur lors de la vérification du statut du QR code:', error);
            setTimeout(() => this.waitForConfirmationQRCode(), 10000);
        }
    }
})


