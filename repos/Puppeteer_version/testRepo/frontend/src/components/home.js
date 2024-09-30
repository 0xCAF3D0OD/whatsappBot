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
    <div x-data="Header" x-html="template()"></div>
    <div x-data="welcomeMessage" x-html="template()"></div>
    <div x-data="DateTimeDisplay" x-html="template()"></div>
    <div x-data="CoverImage" x-html="template()"></div>
    <div x-data="ConnectionTest" x-html="template()"></div>
    <div x-data="FeaturesGrid" x-html="template()"></div>
    </div>
    <div x-data="Footer" x-html="template()"></div>
  `;
 });