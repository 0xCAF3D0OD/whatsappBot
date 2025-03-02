import { Header, Footer } from "../controller/HomeController.js";
import { MainPageSession } from '../controller/WhatsappPageController.js'

export const WhatsappPageComponent = () => ({
    Header: Header(),
    MainPageSession: MainPageSession(),
    Footer: Footer(),

    template() {
        return `
        <div class="container mx-auto px-4 py-8 flex-grow">
            <div x-html="MainPageSession.template()"></div>
        </div>
        <div x-html="Footer.template()"></div>
        `;
    }
});