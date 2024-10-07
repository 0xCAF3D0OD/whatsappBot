// import { ConnectionQRCode } from '../controller/QRCodeController.js';
import { Header, Footer } from "../controller/HomeController.js";
import { chatBotInterface } from '../controller/WhatsappPageController.js'

export const whatsappPageComponent = () => ({
    Header: Header(),
    Footer: Footer(),
    Chat: chatBotInterface(),

    template() {
        return `
         <div class="container mx-auto px-4 py-8 flex-grow">
            <div x-html="Header.template()"></div>
            <div x-html="Chat.template()"></div>
         </div>
         <div x-html="Footer.template()"></div>
        `
    }
})