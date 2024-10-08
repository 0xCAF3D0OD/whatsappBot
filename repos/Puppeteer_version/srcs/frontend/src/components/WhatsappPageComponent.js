import { Header, Footer } from "../controller/HomeController.js";
import { Chat } from '../controller/WhatsappPageController.js'

export const whatsappPageComponent = () => ({
    Header: Header(),
    Footer: Footer(),
    Chat: Chat(),

    template() {
        return `
         <div class="container mx-auto px-4 py-8 flex-grow">
<!--            <div x-html="Header.template()"></div>-->
            <div x-html="Chat.template()"></div>
         </div>
         <div x-html="Footer.template()"></div>
        `
    }
})