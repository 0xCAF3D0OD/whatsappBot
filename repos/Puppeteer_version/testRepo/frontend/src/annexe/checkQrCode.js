export const checkQRCode = () => ({
   isScanned: false,
   waitForConfirmationQRCode() {
       fetch('/whatsappBot/check_qr_code_status')
           .then(response => {
               if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);
               return response.json();
           })
           .then(data => {
               if (data.scanned) {
                   console.log('QR Code scanné avec succès !');
                   this.isScanned = true;
               } else {
                   setTimeout(() => this.waitForConfirmationQRCode(), 5000);
               }
           })
           .catch(error => {
               console.error('Erreur lors de la vérification du statut du QR code:', error);
               setTimeout(() => this.waitForConfirmationQRCode(), 10000);
           });
   }
});