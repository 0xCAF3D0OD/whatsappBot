import { checkQRCode } from "../annexe/checkQrCode.js";
import {Login} from '../routes.js';
import { setupQRCodeDownload } from "../annexe/setupQRCode.ts";


export const ConnectionQRCode = () => ({
    setup() {
        return {
            ...setupQRCodeDownload(),
            ...checkQRCode(),
            message: 'Testing connection...',
            init() {
                this.downloadQRCode();
            }
        };
    },
    template() {
        return `
        <div x-data="ConnectionQRCode.setup()" class="flex justify-center items-center min-h-screen">
            <div class="max-w-md w-full p-8">
                <div id="qrcode-container" x-show="!isScanned" class="text-center">
                    <h1 class="text-2xl font-bold mb-6 text-gray-800 p-10">
                        Scanner le QR Code
                    </h1>
                    
                    <p  x-show="isLoading" 
                        class="text-lg mb-6 text-gray-600">
                        Chargement du QR code...
                    </p>
                    
                    <img x-show="!isLoading && QRCodeURL" 
                         :src="QRCodeURL" 
                         alt="QR Code" 
                         class="mx-auto mb-6 shadow-md">
                    
                    <p x-show="!isLoading && !QRCodeURL" 
                       class="text-lg mb-6 text-red-600">
                        Erreur lors du chargement du QR code.
                    </p>
                    
                    <p class="text-lg mb-6 text-gray-700 p-10">
                        Ouvrez WhatsApp sur votre téléphone et scannez le code QR
                     </p>
                    
                    <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full 
                    transition duration-300 ease-in-out">
                        Rafraîchir le QR Code
                    </button>
                </div>
                <div id="qrcode-container" x-show="isScanned">
                    <h1 class="text-2xl font-semibold mb-5">QR Code scanné avec succès !</h1>
                    <a href="/testBot/whatsapp" class="inline-block bg-[#0071e3] text-white border-none py-3 px-6 text-lg 
                    font-normal rounded-full cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#0077ed]">
                        Continuer
                    </a>
                </div>
            </div>
        </div>
    `
    }
});