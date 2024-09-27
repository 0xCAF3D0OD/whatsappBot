// routes.js
export const routes = [
    {
        path: '/',
        template: '/pages/home.html',
        handler: () => console.log('Home page loaded')
    },
    {
        path: '/whatsappBot',
        template: '/pages/QRCode.html',
        handler: () => console.log('WhatsApp Bot page loaded')
    },
    // Ajoutez d'autres routes ici
];

export function setupRoutes(router) {
    routes.forEach(route => {
        router.add(route.path, {
            template: route.template,
            handler: route.handler
        });
    });
}