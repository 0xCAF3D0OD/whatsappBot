export const Header = () => ({
    template() {
        return `
            <header class="flex justify-between items-center mb-16">
              <nav>
                  <a href="/" class="text-2xl font-bold text-custom hover">On Assemble</a>
              </nav>
              <nav>
                <ul class="flex space-x-6">
                  <li><a href="/feature" class="text-custom hover:underline">Features</a></li>
                  <li><a href="/about" class="text-custom hover:underline">Pricing</a></li>
                  <li><a href="/contact" class="text-custom hover:underline">About</a></li>
                </ul>
              </nav>
            </header>`
    }
});

export const WelcomeMessage = () => ({
    message: 'Welcome to Our Platform',
    description: 'Plan, proof, and present your projects with a simple timeline. No complex Gantt charts, just straightforward organization.',
    template() {
        return `
        <div class="text-center mb-16">
          <h2 class="text-6xl font-bold text-custom mb-6" x-text="message"></h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto" x-text="description"></p>
        </div>`
    }
});

export const CoverImage = () => ({
    message: 'Let the chat Bot check your message',
    template() {
        return `
        <div class="relative mb-16">
          <img src="https://www.contus.com/blog/wp-content/uploads/2023/03/chat-user-interface-1024x535.png"
               alt="Cover Image" class="w-full h-auto object-cover rounded-lg shadow-lg">
          <div class="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 rounded-lg">
            <h3 class="text-4xl font-bold" x-text="message"></h3>
          </div>
        </div>`
    }
});

export const ConnectionTest = () => ({
    message: 'Test redirection page',
    template() {
        return `
        <div x-data="{
            message: 'Testing connection...',
            testBackend() {
                fetch('http://localhost:3000/whatsappBot/api/test')
                    .then(response => response.json())
                    .then(data => {
                        this.message = data.message;
                        setTimeout(() => {
                            Alpine.raw($router).navigate('/whatsappBotPage');
                        }, 1000);
                    })
                    .catch(error => {
                        this.message = 'Error connecting to backend';
                        console.error('Error:', error);
                    });
            }
        }" class="text-center mb-16">
            <h3 class="text-2xl font-light text-custom mb-6" x-text="message"></h3>
            <button @click="testBackend()" class="button-custom px-8 py-3 rounded-full text-lg font-semibold transition duration-300">
              Test Connection
            </button>
        </div>`
    }
});

export const FeaturesGrid = () => ({
    message: 'Let the chat Bot check your message',
    description: [
        {
            title: 'Plan',
            text: 'Organize tasks and discussion in a visual interface chatbot',
        },
        {
            title: 'Proof',
            text: 'Share message, assets, and docs via review links in chatBot',
        },
        {
            title: 'Present',
            text: 'Invite clients and partners into your workflow',
        },
    ],
    template() {
        return `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            ${this.description.map(desc => `
                <div>
                    <h4 class="text-xl font-semibold mb-2">${desc.title}</h4>
                    <p class="text-gray-600">${desc.text}</p>
                </div>
            `).join('')}
        </div>`
    }
});

export const Footer = () => ({
    message: '@2024 On Assemble. All rights reserved.',
    template() {
        return `
        <footer class="bg-gray-100 py-8">
          <div class="container mx-auto text-center text-custom">
            <p x-text="message"></p>
          </div>
        </footer>`
    }
});