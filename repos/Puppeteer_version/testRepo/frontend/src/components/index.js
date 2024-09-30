import { setupRoutes } from '../controller/routes.js';
import Alpine from 'alpinejs'

document.addEventListener('alpine:init', () => {
    Alpine.plugin(PineconeRouter);

    Alpine.data('app', () => ({
        init() {
            PineconeRouter.settings.templateTargetId = 'app';
            PineconeRouter.settings.hash = false;

            setupRoutes(PineconeRouter);

            PineconeRouter.listen();
        }
    }));
});