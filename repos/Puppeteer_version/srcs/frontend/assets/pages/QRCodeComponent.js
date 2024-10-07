export const cardComponent = () => ({
    template() {
        return `
            <div class="container max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
                <div class="w-full flex justify-center">
                    <img src="vite.svg" alt="Logo" class="h-8 mb-6">
                </div>
                <div>
                    <div x-show="!isScanned">
                        <h1 class="text-3xl font-bold mb-2 text-gray-900 text-center">Connexion</h1>
                        <p class="text-gray-500 mb-8 text-center">Scannez le QR code pour continuer</p>
                    </div>
                    <div x-show="isScanned">
                        <h1 class="text-2xl font-semibold mb-5 text-center">QR Code scanné avec succès !</h1>
                    </div>                    
                    <div class=" rounded-xl p-4 mb-8">
                        <div x-show="!isScanned" x-ref="qrCodeContainer"></div>
                        <div x-show="isScanned" x-ref="animationContainer"></div>
                    </div>

                    <div class="space-y-4 mb-8">
                        <div class="flex items-start">
                            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center 
                            justify-center text-blue-600 font-bold mr-3">
                                1
                            </div>
                            <p class="text-left text-gray-600">Ouvrez WhatsApp sur votre téléphone</p>
                        </div>
                        <div class="flex items-start">
                            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center 
                            justify-center text-blue-600 font-bold mr-3">
                                2
                            </div>
                            <p class="text-left text-gray-600">
                                Appuyez sur Paramètres > Appareils liés > Lier un appareil
                            </p>
                        </div>
                        <div class="flex items-start">
                            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center 
                            justify-center text-blue-600 font-bold mr-3">
                                3
                            </div>
                            <p class="text-left text-gray-600">
                                Pointez votre téléphone vers cet écran pour scanner le code
                            </p>
                        </div>
                    </div>
                    <div x-show="!isScanned" x-ref="refreshButtonContainer"></div>
                    <div x-show="isScanned" x-ref="continueButtonContainer"></div>
                </div>
<!--                <div x-show="isScanned" class="text-center">-->
<!--                    <a href="/whatsappLoginPage/whatsappSession" class="inline-block w-full bg-blue-600 hover:bg-blue-700 -->
<!--                    text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out">-->
<!--                        Continuer-->
<!--                    </a>-->
<!--                </div>-->
            </div>
        `;
    }
});