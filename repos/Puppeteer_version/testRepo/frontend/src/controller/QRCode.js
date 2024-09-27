export function Header() {
    return `
        <header class="flex justify-between items-center mb-16">
          <h1 class="text-2xl font-bold text-custom">On Assemble</h1>
          <nav>
            <ul class="flex space-x-6">
              <li><a href="#" class="text-custom hover:underline">Features</a></li>
              <li><a href="#" class="text-custom hover:underline">Pricing</a></li>
              <li><a href="#" class="text-custom hover:underline">About</a></li>
            </ul>
          </nav>
        </header>
    `;
}

export function ConnectionQRCode() {
    return `
<!--        <div -->
<!--        x-data="{-->
<!--            message: 'Testing connection...',-->
<!--            isScanned: false,-->
<!--            waitForConfirmationQRCode() {-->
<!--                fetch('/whatsappBot/check_qr_code_status')-->
<!--                    .then(response => {-->
<!--                        if (!response.ok) throw new Error(\`HTTP Error! status: \${response.status}\`);-->
<!--                        return response.json();-->
<!--                    })-->
<!--                    .then(data => {-->
<!--                        if (data.scanned) {-->
<!--                            console.log('QR Code scanné avec succès !');-->
<!--                            this.isScanned = true;-->
<!--                        } else {-->
<!--                            setTimeout(() => this.waitForConfirmationQRCode(), 5000);-->
<!--                        }-->
<!--                    })-->
<!--                    .catch(error => {-->
<!--                        console.error('Erreur lors de la vérification du statut du QR code:', error);-->
<!--                        setTimeout(() => this.waitForConfirmationQRCode(), 10000);-->
<!--                    });-->
<!--            }-->
<!--        }" -->
<!--        x-init="waitForConfirmationQRCode"-->
        <div class="flex justify-center items-center min-h-screen bg-[#fbfbfd] font-['SF_Pro_Display',-apple-system,BlinkMacSystemFont,sans-serif] text-[#1d1d1f]">
        <div class="max-w-[400px] p-10 text-center bg-white rounded-[18px] shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
<!--            <div id="qrcode-container" x-show="!isScanned">-->
            <div id="qrcode-container">
                <h1 class="text-2xl font-semibold mb-5">Scanner le QR Code</h1>
                <img src="/whatsappBot" alt="QR Code" class="max-w-full h-auto mb-5">
                <p class="mb-5">Ouvrez WhatsApp sur votre téléphone et scannez le code QR</p>
            </div>
<!--            <div id="message" x-show="isScanned">-->
<!--                <h1 class="text-2xl font-semibold mb-5">QR Code scanné avec succès !</h1>-->
<!--                <a href="/testBot/whatsapp" class="inline-block bg-[#0071e3] text-white border-none py-3 px-6 text-lg -->
<!--                font-normal rounded-full cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#0077ed]">-->
<!--                    Continuer-->
<!--                </a>-->
<!--            </div>-->
        </div>
    `;
}

export function Footer() {
    return `
        <footer class="bg-gray-100 py-8">
          <div class="container mx-auto text-center text-custom">
            <p>&copy; 2024 On Assemble. All rights reserved.</p>
          </div>
        </footer>
  `;
}
