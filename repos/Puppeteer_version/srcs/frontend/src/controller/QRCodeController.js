import '../../assets/style/qrcodePage.css'
import { checkingQrCode } from "../annexe/checkingQrCode.js";
import { checkingUserScan } from "../annexe/userScan.js";
import { pageRedirections, setupQRCodeDownload } from "../annexe/setupQRCode.ts";


export const ConnectionQRCode = () => ({
    setup() {
        return {
            ...setupQRCodeDownload(),
            ...checkingQrCode(),
            ...pageRedirections(),
            ...checkingUserScan(),
            isScanned: false,
            loading: false,
            init() {
                this.downloadQRCode();
                // this.whaitOnUserScan();
                this.waitForConfirmationQRCode();
            }
        };
    },
    template() {
        return `
        <div x-data="ConnectionQRCode.setup()" x-init="init" class="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <div x-data="cardComponent()" x-init="$nextTick(() => {
                $refs.qrCodeContainer.innerHTML = document.getElementById('qr-code-template').innerHTML;
                $refs.animationContainer.innerHTML = document.getElementById('animation-template').innerHTML;
                $refs.refreshButtonContainer.innerHTML = document.getElementById('refresh-button-template').innerHTML;
                $refs.continueButtonContainer.innerHTML = document.getElementById('continue-button-template').innerHTML;
            })">
                <div x-html="template()"></div>
            </div>
        </div>

        <template id="qr-code-template">
            <div class="relative w-64 h-64 mx-auto">
                <!-- QR Code Image -->
                <img x-show="QRCodeURL" :src="QRCodeURL" 
                     alt="QR Code" 
                     class="absolute inset-0 w-full h-full object-cover">
                
                <!-- Loading Overlay !! a voir plus tard -->
                <div x-show="loading" x-init="whaitOnUserScan" class="absolute inset-0 flex items-center justify-center">
                    <div class="absolute inset-0 bg-white"
                         style="opacity: 90%;"></div>
                    <div class="relative w-16 h-16 bg-white flex items-center justify-center">
                        <div class="loader code"></div>
                    </div>
                </div>
                
                <!-- Error Message -->
                <div x-show="!isLoading && !QRCodeURL"
                     class="absolute inset-0 flex items-center justify-center bg-white">
                    <p class="text-red-600">Erreur lors du chargement du QR code.</p>
                </div>
            </div>
        </template>

        <template id="animation-template">
            <div class="w-64 h-64 mx-auto flex items-center justify-center">
                <svg class="w-full h-full" viewBox="0 0 400 400">
                  <g transform="translate(200 200)">
                    <circle
                      class="text-green-500 animate-draw-circle"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="10"
                      cx="0"
                      cy="0"
                      r="120"
                      stroke-linecap="round"
                    />
                    <g class="success-tick" transform="scale(0.5)">
                      <polyline
                        class="text-green-500 animate-draw-tick"
                        fill="none"
                        stroke="currentColor"
                        points="-108,14 -23,84 108,-62"
                        stroke-width="24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                  </g>
                </svg>
            </div>
        </template>
        
        <template id="refresh-button-template">
            <button @click="downloadQRCode" 
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg 
                    transition duration-300 ease-in-out">
                Rafraîchir le QR Code
            </button>
        </template>
        
        <template id="continue-button-template">
            <button @click="redirectToWhatsappSession()" 
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg 
                    transition duration-300 ease-in-out">
                Continuer
            </button>
        </template>
    `
    }
});