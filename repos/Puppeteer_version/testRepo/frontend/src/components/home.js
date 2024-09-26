import {
    Header,
    WelcomeMessage,
    DateTimeDisplay,
    CoverImage,
    ConnectionTest,
    FeaturesGrid,
    Footer,
} from '../controller/Home.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    app.innerHTML = `
    <div x-data="{
        message: 'Testing connection...',
        showMenu: false,
        currentTime: new Date().toLocaleTimeString(),
        currentDate: new Date().toLocaleDateString(),
      }"
      x-init="setInterval(() => currentTime = new Date().toLocaleTimeString(), 1000)"
      class="container mx-auto px-4 py-8 flex-grow">
      ${Header()}
      ${WelcomeMessage()}
      ${DateTimeDisplay()}
      ${CoverImage()}
      ${ConnectionTest()}
      ${FeaturesGrid()}
    </div>
    ${Footer()}
  `;

    // Initialiser Alpine.js si nécessaire
    if (typeof Alpine === 'function') {
        Alpine.start();
    }
 });