import Alpine from 'alpinejs';
import PineconeRouter from 'pinecone-router';
import { Header, WelcomeMessage, DateTimeDisplay, CoverImage, ConnectionTest, FeaturesGrid, Footer } from './controller/Home.js';

window.Alpine = Alpine;
Alpine.plugin(PineconeRouter);

document.addEventListener('alpine:init', () => {
    Alpine.data('Header', Header);
    Alpine.data('WelcomeMessage', WelcomeMessage);
    Alpine.data('DateTimeDisplay', DateTimeDisplay);
    Alpine.data('CoverImage', CoverImage);
    Alpine.data('ConnectionTest', ConnectionTest);
    Alpine.data('FeaturesGrid', FeaturesGrid);
    Alpine.data('Footer', Footer);

    window.PineconeRouter.add('/', {
        template: `
      <div x-data="Header" x-html="template()"></div>
      <div x-data="WelcomeMessage" x-html="template()"></div>
      <div x-data="DateTimeDisplay" x-html="template()"></div>
      <div x-data="CoverImage" x-html="template()"></div>
      <div x-data="ConnectionTest" x-html="template()"></div>
      <div x-data="FeaturesGrid" x-html="template()"></div>
      <div x-data="Footer" x-html="template()"></div>
    `
    });
    window.PineconeRouter.settings.templateTargetId = 'app';
});

Alpine.start();