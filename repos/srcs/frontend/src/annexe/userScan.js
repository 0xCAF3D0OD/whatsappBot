import {Backend, Login} from "../routes.js";

export const checkingUserScan = () => ({
    async whaitOnUserScan() {
        try {
            const response = await fetch(`${Backend}${Login}/check_scanned_status`);
            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            if (data.iwasScanned) {
                console.log('QR Code scanné par l utilisateur !');
                this.loading = true;
            } else
                setTimeout(() => this.whaitOnUserScan(), 5000);
        } catch (error) {
            console.error('Erreur lors de la vérification du statut du scan:', error);
            setTimeout(() => this.whaitOnUserScan(), 10000);
        }
    }
});
