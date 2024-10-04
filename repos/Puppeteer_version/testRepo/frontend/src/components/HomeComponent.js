
import {
    Header, WelcomeMessage, CoverImage,
    LoadWhatsappPage, FeaturesGrid, Footer
} from '../controller/HomeController.js';

export const HomeComponent = () => ({
    Header: Header(),
    WelcomeMessage: WelcomeMessage(),
    CoverImage: CoverImage(),
    LoadWhatsappPage: LoadWhatsappPage(),
    FeaturesGrid: FeaturesGrid(),
    Footer: Footer(),
    template() {
        return `
        <div class="container mx-auto px-4 py-8 flex-grow">
            <div x-html="Header.template()"></div>
            <div x-html="WelcomeMessage.template()"></div>
            <div x-html="CoverImage.template()"></div>
            <div x-html="LoadWhatsappPage.template()"></div>
            <div x-html="FeaturesGrid.template()"></div>
        </div>
        <div x-html="Footer.template()"></div>
        `;
    }
});