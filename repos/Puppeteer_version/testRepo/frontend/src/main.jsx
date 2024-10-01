import './tailwind.css';
import Alpine from 'alpinejs';
import { routes } from "./routes.js";
import PineconeRouter from 'pinecone-router';
import { Header, WelcomeMessage, CoverImage,
    ConnectionTest, FeaturesGrid, Footer } from './controller/Home.js';

window.Alpine = Alpine;
Alpine.plugin(PineconeRouter);

Alpine.data('Header', Header);
Alpine.data('WelcomeMessage', WelcomeMessage);
Alpine.data('CoverImage', CoverImage);
Alpine.data('ConnectionTest', ConnectionTest);
Alpine.data('FeaturesGrid', FeaturesGrid);
Alpine.data('Footer', Footer);

document.addEventListener('alpine:init', () => {
    routes.forEach((routes) => {
        PineconeRouter.add(routes.path, {
            template: `<div x-data="${routes.component}()" x-html="template()"></div>`
        });
    });
    PineconeRouter.add('*', {
        template: '<div>Page not found</div>'
    });
});

try {
   Alpine.start();
    // PineconeRouter.start;

} catch (error) {
    console.error("Erreur lors du démarrage de l'application:", error);
}