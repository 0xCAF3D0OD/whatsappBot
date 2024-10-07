import {Backend, Login} from "../routes.js";

export const checkingUserScan = () => ({
    async whaitOnUserScan() {
        this.isScanned = false;
        try {
            const response = await fetch(`${Backend}${Login}/check_scanned_status`);
            const data = await response.json();
            if (data.iwasScanned) {
                console.log('QR Code scanné par l utilisateur !');
                this.loading = true;
            } else
                setTimeout(() => this.whaitForUserScan(), 5000);
        } catch (error) {
            console.error('Erreur lors de la vérification du statut du scan:', error);
            setTimeout(() => this.whaitForUserScan(), 10000);
        }
    }
});
