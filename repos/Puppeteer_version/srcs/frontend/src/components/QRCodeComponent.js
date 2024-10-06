import { ConnectionQRCode } from '../controller/QRCodeController.js';
import { Header, Footer } from "../controller/HomeController.js";

export const QRCodeComponent = () => ({
    Header: Header(),
    ConnectionQRCode: ConnectionQRCode(),
    Footer: Footer(),
    template() {
        return `
        <div class="flex flex-col min-h-screen">
            <div class="container mx-auto px-4 py-8 flex-grow">
                <div x-html="Header.template()"></div>
                <div x-html="ConnectionQRCode.template()"></div>
            </div>
            <div x-html="Footer.template()" class="mt-auto"></div>
        </div>
        `
    }
})