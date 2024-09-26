import {
    Header,
    ConnectionQRCode,
    Footer,
} from '../controller/QRCode.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    app.innerHTML = `
    <div class="container mx-auto px-4 py-8 flex-grow">
      ${Header()}
      ${ConnectionQRCode()}
    </div>
    ${Footer()}
  `;

    // Initialiser Alpine.js si nécessaire
    if (typeof Alpine === 'function') {
        Alpine.start();
    }
});