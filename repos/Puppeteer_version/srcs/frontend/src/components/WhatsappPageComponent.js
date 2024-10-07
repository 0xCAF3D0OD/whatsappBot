// import { ConnectionQRCode } from '../controller/QRCodeController.js';
import { Header, Footer } from "../controller/HomeController.js";

export const whatsappPageComponent = () => ({
    Header: Header(),
    Footer: Footer(),

    template() {
        return `
         <div class="container mx-auto px-4 py-8 flex-grow">
         
         </div>
         <div x-html="Footer.template()"></div>
        `
    }
})