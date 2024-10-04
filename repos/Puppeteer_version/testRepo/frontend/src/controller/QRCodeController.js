import {checkQRCode} from "../annexe/checkQrCode.js";
import {Login} from '../routes.js';

export const ConnectionQRCode = () => ({
    setup: ()  => ({
        ...checkQRCode(),
        message: 'Testing connection...',
    }),
    template() {
        return `
            <div x-init="waitForConfirmationQRCode" class="flex justify-center items-center min-h-screen ">
                <div class="max-w-[400px] p-10 text-center bg-white rounded-[18px] shadow-[0_4px_20px_rgba(0,0,0,0.1)]">                
                    <div id="qrcode-container" x-show="!isScanned">
                        <h1 class="text-2xl font-semibold mb-5">Scanner le QR Code</h1>
                        <img src="${Login}" alt="QR Code" class="max-w-full h-auto mb-5">
                        <p class="mb-5">Ouvrez WhatsApp sur votre téléphone et scannez le code QR</p>
                    </div>
                    <div id="message" x-show="isScanned">
                        <h1 class="text-2xl font-semibold mb-5">QR Code scanné avec succès !</h1>
                        <a href="${Login}/whatsapp" class="inline-block bg-[#0071e3] text-white border-none py-3 px-6 text-lg 
                        font-normal rounded-full cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#0077ed]">
                            Continuer
                        </a>
                    </div>
            </div>
        `;
    }
})
